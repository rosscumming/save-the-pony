import { useCallback, useEffect } from 'react';
import useMovePony from '../../utils/hooks/useMovePony';
import { Direction, direction } from '../../utils/types/api.type';

type MoveControlsProps = {
  mazeId: string | undefined;
  refetchMazeData: () => void;
};

const MoveControls = ({ mazeId, refetchMazeData }: MoveControlsProps): JSX.Element => {
  const { movePony } = useMovePony(refetchMazeData);

  const handlelClickOrPressMove = useCallback(
    (direction: Direction) => {
      if (mazeId) {
        movePony.mutate({ maze_id: mazeId, direction });
      }
    },
    [mazeId, movePony]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const directionMap: Record<string, Direction> = {
        ArrowUp: 'north',
        ArrowDown: 'south',
        ArrowLeft: 'west',
        ArrowRight: 'east',
      };

      const direction = directionMap[e.key];

      if (direction && mazeId) {
        e.preventDefault();
        movePony.mutate({ maze_id: mazeId, direction });
      }
    },
    [mazeId, movePony]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <button onClick={() => handlelClickOrPressMove(direction.NORTH)}>Up</button>
      <button onClick={() => handlelClickOrPressMove(direction.SOUTH)}>Down</button>
      <button onClick={() => handlelClickOrPressMove(direction.WEST)}>Left</button>
      <button onClick={() => handlelClickOrPressMove(direction.EAST)}>Right</button>
    </div>
  );
};

export default MoveControls;
