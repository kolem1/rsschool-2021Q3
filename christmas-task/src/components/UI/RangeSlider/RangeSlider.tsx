import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './RangeSlider.css';

const Range = createSliderWithTooltip(Slider.Range);

interface IRangeSlider {
  min: number;
  max: number;
  value: [number, number];
  onChange: ([min, max]: number[]) => void;
  step?: number;
}

export const RangeSlider: React.FC<IRangeSlider> = function ({ min, max, step, value, onChange }) {
  return (
    <Range
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      tipFormatter={(curentValue) => curentValue}
    />
  );
};

RangeSlider.defaultProps = {
  step: 1,
};
