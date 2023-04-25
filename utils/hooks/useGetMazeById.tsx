import { useQuery } from '@tanstack/react-query';
import { getMazeById } from '../../src/api/index';
import useCreateMaze from './useCreateMaze';

const useGetMazeById = () => {
  const { mazeId } = useCreateMaze(15, 15, 'Applejack', 0);

  const { data, error, refetch } = useQuery(['mazeGameIdData', mazeId], () => getMazeById({ maze_id: mazeId }), {
    enabled: !!mazeId,
  });

  return { mazeGameData: data, mazeGameDataError: error, refetchMazeData: refetch };
};

export default useGetMazeById;
