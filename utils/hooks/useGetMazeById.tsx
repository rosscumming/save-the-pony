import { useQuery } from '@tanstack/react-query';
import { getMazeById } from '../../src/api/index';

const useGetMazeById = (mazeId: string | undefined) => {
  const { data, error, refetch } = useQuery(['mazeGameIdData', mazeId], () => getMazeById({ maze_id: mazeId }), {
    enabled: !!mazeId,
  });

  return { mazeAllGameData: data, mazeGameDataError: error, refetchMazeData: refetch };
};

export default useGetMazeById;
