import { useQuery } from '@tanstack/react-query';
import { createNewMaze } from '../../src/api/index';
import { useEffect, useState } from 'react';

const useCreateGame = () => {
  const [mazeId, setMazeId] = useState<string | null>(null);

  const initialMazePayload = {
    'maze-width': 15,
    'maze-height': 15,
    'maze-player-name': 'Applejack',
    difficulty: 0,
  };
  const { data, error } = useQuery(['mazeId'], () => createNewMaze(initialMazePayload));

  useEffect(() => {
    if (data && !mazeId) {
      setMazeId(data);
    }
  }, [data, mazeId]);

  return { data, error };
};

export default useCreateGame;
