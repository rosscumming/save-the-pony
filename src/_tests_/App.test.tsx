import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithClient } from './utils';

describe('App', () => {
  it('renders loading state initially', async () => {
    renderWithClient(<App />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('renders the maze, control buttons, and slider after loading', async () => {
    renderWithClient(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('maze-container')).toBeInTheDocument();
      expect(screen.getByTestId('zoom-slider')).toBeInTheDocument();
      expect(screen.getByTestId('restart-button')).toBeInTheDocument();
      expect(screen.getByTestId('settings-button')).toBeInTheDocument();
    });
  });
});
