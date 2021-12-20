import React from 'react';
import Slider, { createSliderWithTooltip, RangeProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './RangeSlider.css';

const Range = createSliderWithTooltip(Slider.Range);

export const RangeSlider: React.FC<RangeProps> = function (props) {
  return (
    <Range
      tipFormatter={(curentValue) => curentValue}
      trackStyle={[{ backgroundColor: '#a81817' }]}
      railStyle={{ backgroundColor: '#c8beb9' }}
      handleStyle={[{ borderColor: '#a81817' }]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
