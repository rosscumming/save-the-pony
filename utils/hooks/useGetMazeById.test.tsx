import { rest } from 'msw';
import { server } from '../../setup';
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../src/_tests_/utils';
import useGetMazeById from './useGetMazeById';

describe('useGetMazeById', () => {
  it('should return correct data for given maze_id ', async () => {
    const { result } = renderHook(() => useGetMazeById('mock_maze_id'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mazeGameData?.maze_id).toBe('abc123');
      expect(result.current.mazeGameData?.pony).toStrictEqual([25]);
      expect(result.current.mazeGameData?.difficulty).toBe(1);
      expect(result.current.mazeGameData?.size).toStrictEqual([15, 15]);
      expect(result.current.mazeGameData?.domokun).toStrictEqual([74]);
      expect(result.current.mazeGameData?.['end-point']).toStrictEqual([112]);
      expect(result.current.mazeGameData?.data).toStrictEqual([['north', 'west'], ['west']]);
      expect(result.current.mazeGameData?.['game-state'].state).toStrictEqual('active');
      expect(result.current.mazeGameData?.['game-state']['state-result']).toStrictEqual('');
      expect(result.current.mazeGameData?.['game-state']['hidden-url']).toStrictEqual('');
    });
  });

  it('should return an error ', async () => {
    server.use(
      rest.get('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const { result } = renderHook(() => useGetMazeById('mock_maze_id'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mazeGameDataError).toBeTruthy();
    });
  });
});
