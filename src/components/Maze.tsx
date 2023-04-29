import { MazeCell } from './MazeCell';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MazeDataInfo } from '../../utils/types/api.type';

const Maze = ({ mazeGameData }: { mazeGameData: MazeDataInfo }) => {
  const [windowWidth] = useWindowSize();
  const [cellSize, setCellSize] = useState<string>('28px');
  const [zoom, setZoom] = useState<number>(0.4);

  const {
    size: [mazeWidth, mazeHeight],
    domokun: [domokunIndex],
    pony: [ponyIndex],
    'end-point': [endPointIndex],
    data,
  } = mazeGameData;

  useEffect(() => {
    setCellSize(`${((windowWidth - 28) / mazeWidth) * zoom}px`);
  }, [windowWidth, mazeWidth, mazeHeight, zoom]);

  return (
    <MazeWrapper cellSize={cellSize} mazeWidth={mazeWidth}>
      {data.map((cell: string[], cellIndex: number) => {
        const cellProps = { cell, cellIndex, domokunIndex, ponyIndex, endPointIndex, cellSize };

        return <MazeCell key={cellIndex} cellProps={cellProps} />;
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
`;
