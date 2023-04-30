import styled from 'styled-components';
import type { MazeDataInfo } from '../../utils/types/api.type';
import RestartButton from './ui/RestartButton';

type EndOfGameProps = {
  mazeGameData: MazeDataInfo;
  onRestart: () => void;
  hasBeenkilled: boolean;
};

const EndOfGame = ({ mazeGameData, onRestart, hasBeenkilled }: EndOfGameProps) => {
  const hasBeenKilledImageUrl = 'https://ponychallenge.trustpilot.com/eW91X2tpbGxlZF90aGVfcG9ueQ==.jpg';
  const defaultEndOfGameImageUrl = `https://ponychallenge.trustpilot.com${mazeGameData?.['game-state']['hidden-url']}`;
  const endOfGameResult = hasBeenkilled ? 'You lost. Killed by monster' : mazeGameData?.['game-state']?.['state-result'];
  const endOfGameUrl = hasBeenkilled ? hasBeenKilledImageUrl : defaultEndOfGameImageUrl;

  return (
    <EndOfGameWrapper>
      <EndOfGameText>{endOfGameResult}</EndOfGameText>
      <StyledImage src={endOfGameUrl} alt="end of game" />
      <RestartButton onRestart={onRestart} />
    </EndOfGameWrapper>
  );
};

export default EndOfGame;

const EndOfGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EndOfGameText = styled.h1`
  font-size: 42px;
`;

const StyledImage = styled.img`
  height: 35vh;
  object-fit: contain;
  width: 100%;
  margin: 10px 0;
`;
