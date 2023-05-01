import styled from 'styled-components';
import { direction } from '../../utils/types/api.type';
import TwilightSparkle from '../assets/twilightsparkle.png';
import Applejack from '../assets/applejack.png';
import RainbowDash from '../assets/rainbowdash.png';
import Rarity from '../assets/rarity.png';
import Fluttershy from '../assets/fluttershy.png';
import PinkiePie from '../assets/pinkiepie.png';
import Domokun from '../assets/domokun.png';
import Rainbow from '../assets/rainbow.png';

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

const getPonyImage = (ponyName: string) => {
  const ponyMap: Record<string, string> = {
    'Twilight Sparkle': TwilightSparkle,
    Applejack: Applejack,
    'Rainbow Dash': RainbowDash,
    Rarity: Rarity,
    Fluttershy: Fluttershy,
    'Pinkie Pie': PinkiePie,
  };
  return ponyMap[ponyName];
};

export const MazeCell = ({ cellProps, ponyName }: { cellProps: MazeCellProps; ponyName: string }): JSX.Element => {
  const { domokunIndex, ponyIndex, endPointIndex, cellIndex, cellSize, cell } = cellProps;

  const roleMap: Record<string, string> = {
    [domokunIndex]: Domokun,
    [ponyIndex]: getPonyImage(ponyName),
    [endPointIndex]: Rainbow,
  };

  const role = roleMap[cellIndex] && <StyledImage cellSize={cellSize} src={`${roleMap[cellIndex]}`} />;

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
