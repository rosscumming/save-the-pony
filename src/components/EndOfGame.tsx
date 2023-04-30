import styled from 'styled-components';
import type { MazeDataInfo } from '../../utils/types/api.type';
import RestartButton from './ui/RestartButton';

type EndOfGameProps = {
  mazeGameData: MazeDataInfo;
  onRestart: () => void;
};

const EndOfGame = ({ mazeGameData, onRestart }: EndOfGameProps) => {
  const endOfGameUrl = `https://ponychallenge.trustpilot.com${mazeGameData?.['game-state']['hidden-url']}`;
  const endOfGameResult = mazeGameData?.['game-state']?.['state-result'];

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
