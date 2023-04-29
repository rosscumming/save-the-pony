import { MazeCell } from './MazeCell';

const Maze = ({ mazeGameData }: any) => {
  if (!mazeGameData) return <div>loading...</div>;

  const {
    size: [mazeWidth, mazeHeight],
    domokun: [domokunIndex],
    pony: [ponyIndex],
    'end-point': [endPointIndex],
    data,
  } = mazeGameData;

  return (
    <div>
      {data.map((cells: string[], cellIndex: number) => {
        const cellProps = { cells, cellIndex, mazeWidth, mazeHeight };

        if (domokunIndex === cellIndex) return 'D';
        if (ponyIndex === cellIndex) return 'P';
        if (endPointIndex === cellIndex) return 'E';

        return <MazeCell key={cellIndex} cellProps={cellProps} />;
      })}
    </div>
  );
};

export default Maze;
