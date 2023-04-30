import { useMutation } from '@tanstack/react-query';
import { createNewMaze } from '../../src/api/index';
import type { MazePayload } from '../types/api.type';

const useCreateMazeId = (width: number, height: number, playername: string, difficulty: number) => {
  const mazePayload: MazePayload = {
    'maze-width': width,
    'maze-height': height,
    'maze-player-name': playername,
    difficulty,
  };

  const { mutate, data, isError } = useMutation(() => createNewMaze(mazePayload));

  return { createMaze: mutate, mazeId: data, mazeIdError: isError };
};

export default useCreateMazeId;
