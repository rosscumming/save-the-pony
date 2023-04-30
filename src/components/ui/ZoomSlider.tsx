import React from 'react';
import styled from 'styled-components';

type ZoomSliderProps = {
  zoom: number;
  onZoomChange: (zoomValue: number) => void;
};

const ZoomSlider = ({ zoom, onZoomChange }: ZoomSliderProps) => {
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onZoomChange(Number(e.target.value));
  };

  return (
    <SliderWrapper>
      <Label htmlFor="zoom">Zoom:</Label>
      <Slider type="range" id="zoom" min={0.3} max={0.7} step={0.1} value={zoom} onChange={handleZoomChange} />
    </SliderWrapper>
  );
};

export default ZoomSlider;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 15px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Slider = styled.input`
  width: 100%;
`;
