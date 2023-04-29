import { useEffect } from 'react';
import './App.css';
import useGetMazeById from '../utils/hooks/useGetMazeById';
import useCreateMaze from '../utils/hooks/useCreateMaze';
import useMovePony from '../utils/hooks/useMovePony';
import Maze from './components/Maze';

function App() {
  const { createMaze, mazeId } = useCreateMaze(15, 15, 'Applejack', 0);
  const { mazeGameData, refetchMazeData } = useGetMazeById(mazeId);

  useMovePony(mazeId, refetchMazeData);

  useEffect(() => {
    createMaze();
  }, [createMaze]);

  if (!mazeGameData) return <div> loading...</div>;

  return (
    <div className="App">
      <Maze mazeGameData={mazeGameData} />
    </div>
  );
}

export default App;
