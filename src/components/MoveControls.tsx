import { useCallback, useEffect, useState } from 'react';
import useMovePony from '../../utils/hooks/useMovePony';
import { Direction, direction } from '../../utils/types/api.type';

type MoveControlsProps = {
  mazeId: string | undefined;
  refetchMazeData: () => void;
};

const directionMap: Record<string, Direction> = {
  ArrowUp: 'north',
  ArrowDown: 'south',
  ArrowLeft: 'west',
  ArrowRight: 'east',
};

const MoveControls = ({ mazeId, refetchMazeData }: MoveControlsProps): JSX.Element => {
  const [pressedDirection, setPressedDirection] = useState<Direction | null>(null);

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
      <Button active={pressedDirection === direction.NORTH} onClick={() => handlelClickOrPressMove(direction.NORTH)}>
        UP
      </Button>
      <HorizontalButtons>
        <Button active={pressedDirection === direction.WEST} onClick={() => handlelClickOrPressMove(direction.WEST)}>
          LEFT
        </Button>
        <Button active={pressedDirection === direction.SOUTH} onClick={() => handlelClickOrPressMove(direction.SOUTH)}>
          DOWN
        </Button>
        <Button active={pressedDirection === direction.EAST} onClick={() => handlelClickOrPressMove(direction.EAST)}>
          RIGHT
        </Button>
      </HorizontalButtons>
    </ButtonWrapper>
  );
};

export default MoveControls;

import styled from 'styled-components';

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
  margin-top: 5px;
`;

const Button = styled.button<{ active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#2980b9' : '#1e90ff;')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover,
  &:focus {
    background-color: #2980b9;
  }

  &:active {
    ${({ active }) => active && 'background-color: #1e90ff;'}
  }
`;
