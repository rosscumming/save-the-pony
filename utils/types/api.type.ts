export type MazePayload = {
  'maze-width': number;
  'maze-height': number;
  'maze-player-name': string;
  difficulty: number;
};

export type MazeDataInfo = {
  pony: [number];
  domokun: [number];
  'end-point': [number];
  size: [number, number];
  difficulty: number;
  data: string[][];
  maze_id: string;
  'game-state': {
    state: string;
    'state-result': string;
    'hidden-url': string;
  };
};

export const direction = {
  NORTH: 'north',
  SOUTH: 'south',
  EAST: 'east',
  WEST: 'west',
} as const;

export type Direction = (typeof direction)[keyof typeof direction];
