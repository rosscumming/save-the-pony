import type { GameConfig } from '../types/api.type';

export type SettingsProps = {
  onUpdateSettings: (newSettings: GameConfig) => void;
};
