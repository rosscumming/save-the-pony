import { vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import DirectionalButton from './DirectionalButton';

const eventFn = vi.fn();
describe('DirectionalButton', () => {
  it('renders the directional button', () => {
    const { getByText } = render(
      <DirectionalButton
        active={false}
        onMouseDown={() => {
          eventFn;
        }}
        onMouseUp={() => {
          eventFn;
        }}
      >
        Direction
      </DirectionalButton>
    );

    expect(getByText('Direction')).toBeInTheDocument();
  });

  it('should add active styles when the active prop is true', () => {
    const { getByText } = render(
      <DirectionalButton
        active={true}
        onMouseDown={() => {
          eventFn;
        }}
        onMouseUp={() => {
          eventFn;
        }}
      >
        Active Direction
      </DirectionalButton>
    );

    const button = getByText('Active Direction');
    expect(button).toHaveStyle('background-color: #2980b9');
    expect(button).toHaveStyle('transform: scale(0.95)');
  });

  it('should call onMouseDown and onMouseUp when the button is pressed and let go', () => {
    const onMouseDown = vi.fn();
    const onMouseUp = vi.fn();

    const { getByText } = render(
      <DirectionalButton active={false} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        Pressed Button
      </DirectionalButton>
    );

    const button = getByText('Pressed Button');
    fireEvent.mouseDown(button);
    expect(onMouseDown).toHaveBeenCalledTimes(1);

    fireEvent.mouseUp(button);
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });
});
