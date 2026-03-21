import { http, HttpResponse } from 'msw';
import { server } from '../../setup';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../src/_tests_/utils';
import useMovePony from './useMovePony';
import { vi } from 'vitest';

describe('useMovePony', () => {
  it('should return "move accepted" when provided with mazeId and direction', async () => {
    server.use(
      http.post('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', () => {
        return HttpResponse.json({ 'game-state': { state: 'active', 'state-result': 'move accepted' } }, { status: 200 });
      })
    );

    const movePonySuccess = vi.fn();

    const { result } = renderHook(() => useMovePony(movePonySuccess), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.movePony.mutate({ maze_id: 'abc123', direction: 'north' });
    });

    await waitFor(() => {
      expect(result.current.movePony.error).toBe(null);
      expect(result.current.movePony.data?.['game-state'].state).toBe('active');
      expect(result.current.movePony.data?.['game-state']['state-result']).toBe('move accepted');
    });
  });

  it('should return an error when the API returns a 400 status code', async () => {
    server.use(
      http.post('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    const movePonySuccess = vi.fn();

    const { result } = renderHook(() => useMovePony(movePonySuccess), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.movePony.mutate({ maze_id: 'abc123', direction: 'north' });
    });

    await waitFor(() => {
      expect(result.current.movePony.error).toBeTruthy();
      expect(result.current.movePony.data).toBeUndefined();
    });
  });

  it.each([
    ['won', 'You won. Game ended'],
    ['lost', 'You lost. Killed by monster'],
  ])('should return a %s state when the game is %s', async (state, stateResult) => {
    server.use(
      http.post('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', () => {
        return HttpResponse.json({ 'game-state': { state, 'state-result': stateResult } }, { status: 200 });
      })
    );

    const movePonyStateChange = vi.fn();

    const { result } = renderHook(() => useMovePony(movePonyStateChange), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.movePony.mutate({ maze_id: 'abc123', direction: 'north' });
    });

    await waitFor(() => {
      expect(result.current.movePony.error).toBe(null);
      expect(result.current.movePony.data?.['game-state'].state).toBe(state);
      expect(result.current.movePony.data?.['game-state']['state-result']).toBe(stateResult);
    });
  });
});
