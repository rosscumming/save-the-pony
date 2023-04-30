import { useEffect, useState } from 'react';
import useGetMazeById from '../utils/hooks/useGetMazeById';
import useCreateMaze from '../utils/hooks/useCreateMaze';
import Maze from './components/Maze';
import useWindowSize from '../utils/hooks/useWindowSize';
import MoveControls from './components/MoveControls';
import EndOfGame from './components/EndOfGame';
import RestartButton from './components/ui/RestartButton';
import Settings from './components/ui/SettingsButton';
import { MazePayload } from '../utils/types/api.type';
import styled from 'styled-components';

function App(): JSX.Element {
  const [settings, setSettings] = useState<MazePayload>({
    'maze-width': 15,
    'maze-height': 15,
    'maze-player-name': 'Applejack',
    difficulty: 0,
  });
  const { createMaze, mazeId } = useCreateMaze(settings);
  const { mazeGameData, refetchMazeData } = useGetMazeById(mazeId);
  const [zoom, setZoom] = useState<number>(0.3);
  const [windowWidth] = useWindowSize();

  useEffect(() => {
    setZoom(windowWidth < 750 ? 0.9 : 0.3);
  }, [windowWidth]);

  useEffect(() => {
    createMaze(settings);
  }, [createMaze, settings]);

  const hasGameEnded = mazeGameData?.['game-state']?.state === 'over' || mazeGameData?.['game-state']?.state === 'won';

  const restartGame = () => {
    createMaze(settings);
  };

  const updateSettings = (newSettings: MazePayload) => {
    setSettings(newSettings);
    createMaze(newSettings);
  };

  if (!mazeGameData) return <div> loading...</div>;

  return (
    <div className="App">
      {hasGameEnded ? (
        <EndOfGame mazeGameData={mazeGameData} onRestart={restartGame} />
      ) : (
        <>
          <Maze mazeGameData={mazeGameData} zoom={zoom} windowWidth={windowWidth} />
          <ControlsWrapper>
            <MoveControls mazeId={mazeId} refetchMazeData={refetchMazeData} />
            <RestartAndSettings>
              <RestartButton onRestart={restartGame} />
              <Settings onUpdateSettings={updateSettings} />
            </RestartAndSettings>
          </ControlsWrapper>
        </>
      )}
    </div>
  );
}

export default App;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RestartAndSettings = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
