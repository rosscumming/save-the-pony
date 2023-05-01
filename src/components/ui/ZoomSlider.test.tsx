import { vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ZoomSlider from './ZoomSlider';

describe('ZoomSlider', () => {
  const onZoomChange = vi.fn();
  const zoomValue = 0.5;

  it('renders the zoom slider', () => {
    const { getByTestId } = render(<ZoomSlider zoom={zoomValue} onZoomChange={onZoomChange} />);
    expect(getByTestId('zoom-slider')).toBeInTheDocument();
  });

  it('should call onZoomChange with the updated zoom value when the slider is moved', () => {
    const { getByTestId } = render(<ZoomSlider zoom={zoomValue} onZoomChange={onZoomChange} />);
    const slider = getByTestId('zoom-slider')?.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '0.7' } });
    expect(onZoomChange).toHaveBeenCalledWith(0.7);
  });
});
