import { vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import RestartButton from './RestartButton';

const eventFn = vi.fn();
describe('RestartButton', () => {
  it('renders the restart button', () => {
    const { getByText } = render(
      <RestartButton
        onRestart={() => {
          eventFn;
        }}
      />
    );
    expect(getByText('Restart ↻')).toBeInTheDocument();
  });

  it('should call the onRestart prop when the button is clicked/pressed', () => {
    const onRestart = vi.fn();
    const { getByTestId } = render(<RestartButton onRestart={onRestart} />);

    const button = getByTestId('restart-button');
    fireEvent.click(button);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('should have the correct styles', () => {
    const { getByText } = render(
      <RestartButton
        onRestart={() => {
          eventFn;
        }}
      />
    );
    const button = getByText('Restart ↻');
    expect(button).toHaveStyle('background-color: #1e90ff');
    expect(button).toHaveStyle('color: white');
  });
});
