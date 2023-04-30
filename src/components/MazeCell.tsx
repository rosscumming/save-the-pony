import styled from 'styled-components';
import { direction } from '../../utils/types/api.type';

export type MazeCellProps = {
  domokunIndex: number;
  ponyIndex: number;
  endPointIndex: number;
  cellIndex: number;
  cellSize: string;
  cell: string[];
};

const getCellBorders = (cell: string[]) => `
  border-top: ${cell.includes(direction.NORTH) ? '2px solid' : ''};
  border-left: ${cell.includes(direction.WEST) ? '2px solid' : ''};
`;

export const MazeCell = ({ cellProps }: { cellProps: MazeCellProps }): JSX.Element => {
  const { domokunIndex, ponyIndex, endPointIndex, cellIndex, cellSize, cell } = cellProps;

  const roleMap: Record<string, string> = {
    [domokunIndex]: 'domokun.png',
    [ponyIndex]: 'Applejack.png',
    [endPointIndex]: 'rainbow.png',
  };

  const role = roleMap[cellIndex] && <StyledImage cellSize={cellSize} src={`src/assets/${roleMap[cellIndex]}`} />;

  return (
    <StyledMazeCell cellSize={cellSize} cell={cell}>
      {role}
    </StyledMazeCell>
  );
};

export default MazeCell;

const StyledMazeCell = styled.div<{ cellSize: string; cell: string[] }>`
  background-color: #fff;
  width: ${(props) => props.cellSize};
  height: ${(props) => props.cellSize};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  ${(props) => getCellBorders(props.cell)}
  box-sizing: border-box;
`;

const StyledImage = styled.img<{ cellSize: string }>`
  z-index: 999;
  height: calc(${(props) => props.cellSize} * 0.9);
  width: calc(${(props) => props.cellSize} * 0.9);
`;
