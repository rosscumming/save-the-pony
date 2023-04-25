import './App.css';
import useGetMazeById from '../utils/hooks/useGetMazeById';

function App() {
  const { mazeGameData } = useGetMazeById();

  console.log(mazeGameData);
  return <></>;
}

export default App;
