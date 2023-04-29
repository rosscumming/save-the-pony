import { RefetchOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { getMazeById } from '../../src/api/index';
import { MazeDataInfo } from '../types/api.type';

export type UseGetMazeByIdReturn = {
  mazeGameData: MazeDataInfo | undefined;
  mazeGameDataError: Error | null;
  refetchMazeData: (options?: RefetchOptions | undefined) => Promise<UseQueryResult<MazeDataInfo>>;
};

const useGetMazeById = (mazeId: string | undefined): UseGetMazeByIdReturn => {
  const { data, error, refetch } = useQuery(['mazeGameIdData', mazeId], () => getMazeById({ maze_id: mazeId }), {
    enabled: !!mazeId,
  });

  return { mazeGameData: data, mazeGameDataError: error as Error, refetchMazeData: refetch };
};

export default useGetMazeById;
