import { useCallback, useEffect, useState } from 'react';
import useMovePony from '../../utils/hooks/useMovePony';
import { Direction, direction } from '../../utils/types/api.type';
import DirectionalButton from './ui/DirectionalButton';
import styled from 'styled-components';

type MoveControlsProps = {
  mazeId: string | undefined;
  refetchMazeData: () => void;
};

const directionMap: Record<string, Direction> = {
  ArrowUp: direction.NORTH,
  ArrowDown: direction.SOUTH,
  ArrowLeft: direction.WEST,
  ArrowRight: direction.EAST,
};

const MoveControls = ({ mazeId, refetchMazeData }: MoveControlsProps): JSX.Element => {
  const [pressedDirection, setPressedDirection] = useState<Direction | null>(null);
  const { movePony } = useMovePony(refetchMazeData);

  const handleMove = useCallback(
    (direction: Direction) => {
      setPressedDirection(direction);
      if (mazeId) {
        movePony.mutate({ maze_id: mazeId, direction });
      }
    },
    [mazeId, movePony]
  );

  const handleMoveEnd = useCallback(() => {
    setPressedDirection(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const direction = directionMap[e.key];

      if (direction && mazeId) {
        e.preventDefault();
        setPressedDirection(direction);
        movePony.mutate({ maze_id: mazeId, direction });
      }
    },
    [mazeId, movePony]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const direction = directionMap[e.key];

    if (direction) {
      setPressedDirection(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <ButtonWrapper>
      <DirectionalButton
        active={pressedDirection === direction.NORTH}
        onMouseDown={() => handleMove(direction.NORTH)}
        onMouseUp={handleMoveEnd}
      >
        UP
      </DirectionalButton>
      <HorizontalButtons>
        <DirectionalButton
          active={pressedDirection === direction.WEST}
          onMouseDown={() => handleMove(direction.WEST)}
          onMouseUp={handleMoveEnd}
        >
          LEFT
        </DirectionalButton>
        <DirectionalButton
          active={pressedDirection === direction.SOUTH}
          onMouseDown={() => handleMove(direction.SOUTH)}
          onMouseUp={handleMoveEnd}
        >
          DOWN
        </DirectionalButton>
        <DirectionalButton
          active={pressedDirection === direction.EAST}
          onMouseDown={() => handleMove(direction.EAST)}
          onMouseUp={handleMoveEnd}
        >
          RIGHT
        </DirectionalButton>
      </HorizontalButtons>
    </ButtonWrapper>
  );
};

export default MoveControls;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

const HorizontalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
