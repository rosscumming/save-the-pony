import type { MazePayload } from '../types/api.type';

export type SettingsProps = {
  onUpdateSettings: (newSettings: MazePayload) => void;
};
