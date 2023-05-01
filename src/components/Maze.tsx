import { MazeCell } from './MazeCell';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MazeDataInfo } from '../../utils/types/api.type';

export type MazeProps = {
  mazeGameData: MazeDataInfo;
  zoom: number;
  windowWidth: number;
  ponyName: string;
};

const Maze = ({ mazeGameData, zoom, windowWidth, ponyName }: MazeProps): JSX.Element => {
  const [cellSize, setCellSize] = useState<string>('28px');

  const {
    size: [mazeWidth],
    domokun: [domokunIndex],
    pony: [ponyIndex],
    'end-point': [endPointIndex],
    data,
  } = mazeGameData;

  useEffect(() => {
    setCellSize(`${((windowWidth - 28) / mazeWidth) * zoom}px`);
  }, [windowWidth, mazeWidth, zoom]);

  return (
    <MazeWrapper cellSize={cellSize} mazeWidth={mazeWidth}>
      {data.map((cell: string[], cellIndex: number) => {
        const cellProps = { cell, cellIndex, domokunIndex, ponyIndex, endPointIndex, cellSize };

        return <MazeCell key={cellIndex} cellProps={cellProps} ponyName={ponyName} />;
      })}
    </MazeWrapper>
  );
};

export default Maze;

const MazeWrapper = styled.div<{ cellSize: string; mazeWidth: number }>`
  display: flex;
  flex-wrap: wrap;
  max-width: ${(props) => `calc(${props.cellSize} * ${props.mazeWidth} )`};
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  margin: 0 auto;
`;
