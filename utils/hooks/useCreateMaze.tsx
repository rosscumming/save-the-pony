import { useMutation } from '@tanstack/react-query';
import { createNewMaze } from '../../src/api/index';
import type { MazePayload } from '../types/api.type';

const useCreateMaze = (mazePayload?: MazePayload) => {
  const { mutate, data, isError } = useMutation((payload: MazePayload) => createNewMaze(payload || mazePayload));

  return { createMaze: mutate, mazeId: data, mazeIdError: isError };
};

export default useCreateMaze;
