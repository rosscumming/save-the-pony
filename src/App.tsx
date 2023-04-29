import { useEffect } from 'react';
import './App.css';
import useGetMazeById from '../utils/hooks/useGetMazeById';
import useCreateMaze from '../utils/hooks/useCreateMaze';
import Maze from './components/Maze';

function App() {
  const { createMaze, mazeId } = useCreateMaze(15, 15, 'Applejack', 0);
  const { mazeGameData } = useGetMazeById(mazeId);

  useEffect(() => {
    createMaze();
  }, [createMaze]);

  return (
    <div className="App">
      <Maze mazeGameData={mazeGameData} />
    </div>
  );
}

export default App;
