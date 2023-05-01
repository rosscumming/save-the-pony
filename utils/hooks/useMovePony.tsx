import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { initiatePonyMove } from '../../src/api/index';
import type { Direction, MazeDataInfo } from '../types/api.type';

export type MovePonyProps = {
  maze_id: string;
  direction: Direction;
};

export type UseMovePonyReturn = {
  movePony: UseMutationResult<MazeDataInfo, unknown, MovePonyProps, unknown>;
};

const useMovePony = (movePonySuccess: () => void): UseMovePonyReturn => {
  const movePonyMutation = useMutation(initiatePonyMove, {
    onSuccess: () => {
      movePonySuccess();
    },
  });

  return { movePony: movePonyMutation };
};

export default useMovePony;
