import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { direction } from '../../utils/types/api.type';
import type { MazeDataInfo } from '../../utils/types/api.type';

const mockMazeData: MazeDataInfo = {
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
  rest.post('https://ponychallenge.trustpilot.com/pony-challenge/maze', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ maze_id: 'abc123' }));
  }),
  rest.get('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockMazeData));
  }),
  rest.post('https://ponychallenge.trustpilot.com/pony-challenge/maze/:mazeId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockMazeData));
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
