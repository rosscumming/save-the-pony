import { vi } from 'vitest';
import { render } from '@testing-library/react';
import SettingsButton from './SettingsButton';

describe('Settings', () => {
  const onUpdateSettings = vi.fn();

  it('renders the settings button', () => {
    const { getByText } = render(<SettingsButton onUpdateSettings={onUpdateSettings} />);
    expect(getByText('Settings ⚙️')).toBeInTheDocument();
  });

  it('should have the correct styles for the settings button', () => {
    const { getByText } = render(<SettingsButton onUpdateSettings={onUpdateSettings} />);
    const button = getByText('Settings ⚙️');

    expect(button).toHaveStyle('background-color: #1e90ff');
    expect(button).toHaveStyle('color: white');
  });
});
