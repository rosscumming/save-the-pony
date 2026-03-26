import { render } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { direction } from '../../utils/types/api.type';
import type { MazeDataInfo } from '../../utils/types/api.type';

export const mockMazeData: MazeDataInfo = {
  maze_id: 'abc123',
  pony: [25],
  domokun: [74],
  'end-point': [112],
  size: [15, 15],
  difficulty: 1,
  data: [[direction.NORTH, direction.WEST], [direction.WEST]],
  'game-state': {
    state: 'active',
    'state-result': '',
    'hidden-url': '',
  },
};

export const handlers = [
  http.post('https://ponychallenge.trustpilot.com/pony-challenge/maze', () => {
    return HttpResponse.json({ maze_id: 'abc123' }, { status: 200 });
  }),
  http.get('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', () => {
    return HttpResponse.json(mockMazeData, { status: 200 });
  }),
  http.post('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', () => {
    return HttpResponse.json(mockMazeData, { status: 200 });
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}
