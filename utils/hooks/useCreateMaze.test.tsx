import { rest } from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../src/_tests_/utils';
import { server } from '../../setup';
import useCreateMaze from './useCreateMaze';

const mockPayload = {
  'maze-width': 15,
  'maze-height': 15,
  'maze-player-name': 'blah',
  difficulty: 1,
};

describe('useCreateMaze', () => {
  it('should return correct data ', async () => {
    const { result } = renderHook(() => useCreateMaze(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.createMaze(mockPayload);
    });

    await waitFor(() => {
      expect(result.current.mazeId).toBe('abc123');
      expect(result.current.mazeIdError).toBeFalsy();
    });
  });
  it('should return a 400 server error with incorrect data being sent', async () => {
    const { result } = renderHook(() => useCreateMaze(), {
      wrapper: createWrapper(),
    });

    server.use(
      rest.post('https://ponychallenge.trustpilot.com/pony-challenge/maze', (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    act(() => {
      result.current.createMaze(mockPayload);
    });

    await waitFor(() => {
      expect(result.current.mazeIdError).toBeTruthy();
      expect(result.current.mazeId).toBeUndefined();
    });
  });
});
