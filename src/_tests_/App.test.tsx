import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithClient } from './utils';

describe('App', () => {
  it('renders loading state initially', async () => {
    renderWithClient(<App />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('renders the maze after loading', async () => {
    renderWithClient(<App />);

    await waitFor(() => expect(screen.getByTestId('maze-container')).toBeInTheDocument());
  });
});
