import { useQuery } from '@tanstack/react-query';
import { createNewMaze } from '../../src/api/index';
import type { MazePayload } from '../types/api.type';

const useCreateMaze = (width: number, height: number, playername: string, difficulty: number) => {
  const mazePayload: MazePayload = {
    'maze-width': width,
    'maze-height': height,
    'maze-player-name': playername,
    difficulty,
  };

  const { data, error } = useQuery(['mazeId'], () => createNewMaze(mazePayload), {
    refetchOnWindowFocus: false,
  });

  return { mazeId: data, mazeIdError: error };
};

export default useCreateMaze;
