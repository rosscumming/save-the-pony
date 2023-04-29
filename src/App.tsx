import { useEffect, useMemo, useState } from 'react';
import useGetMazeById from '../utils/hooks/useGetMazeById';
import useCreateMaze from '../utils/hooks/useCreateMaze';
import Maze from './components/Maze';
import useWindowSize from '../utils/hooks/useWindowSize';
import MoveControls from './components/MoveControls';
import EndOfGame from './components/EndOfGame';
import RestartButton from './components/RestartButton';

function App(): JSX.Element {
  const { createMaze, mazeId } = useCreateMaze(15, 15, 'Applejack', 0);
  const { mazeGameData, refetchMazeData } = useGetMazeById(mazeId);
  const [zoom, setZoom] = useState<number>(0.4);
  const [windowWidth] = useWindowSize();

  useEffect(() => {
    setZoom(windowWidth < 750 ? 0.9 : 0.4);
  }, [windowWidth]);

  useEffect(() => {
    createMaze();
  }, [createMaze]);

  const hasGameEnded = useMemo(
    () => mazeGameData?.['game-state']?.state === 'over' || mazeGameData?.['game-state']?.state === 'won',
    [mazeGameData]
  );

  const restartGame = () => {
    createMaze();
  };

  if (!mazeGameData) return <div> loading...</div>;

  return (
    <div className="App">
      {hasGameEnded ? (
        <EndOfGame mazeGameData={mazeGameData} onRestart={restartGame} />
      ) : (
        <>
          <Maze mazeGameData={mazeGameData} zoom={zoom} windowWidth={windowWidth} />
          <MoveControls mazeId={mazeId} refetchMazeData={refetchMazeData} />
          <RestartButton onRestart={restartGame} />
        </>
      )}
    </div>
  );
}

export default App;
