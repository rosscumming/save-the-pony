import { useMutation } from '@tanstack/react-query';
import { createNewMaze } from '../../src/api/index';
import type { GameConfig } from '../types/api.type';

const useCreateMaze = (mazePayload?: GameConfig) => {
  const { mutate, data, isError } = useMutation((payload: GameConfig) => createNewMaze(payload || mazePayload));

  return { createMaze: mutate, mazeId: data, mazeIdError: isError };
};

export default useCreateMaze;
