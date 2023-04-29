import { useCallback, useEffect } from 'react';
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

const useMovePony = (mazeId: string, refetchMazeData: () => void): UseMovePonyReturn => {
  const movePonyMutation = useMutation(initiatePonyMove, {
    onSuccess: () => {
      refetchMazeData();
    },
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let direction: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
          direction = 'north';
          break;
        case 'ArrowDown':
          direction = 'south';
          break;
        case 'ArrowLeft':
          direction = 'west';
          break;
        case 'ArrowRight':
          direction = 'east';
          break;
        default:
          break;
      }

      if (direction) {
        movePonyMutation.mutate({ maze_id: mazeId, direction });
      }
    },
    [mazeId, movePonyMutation]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, mazeId, movePonyMutation]);

  return { movePony: movePonyMutation };
};

export default useMovePony;
