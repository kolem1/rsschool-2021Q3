import React from 'react';
import './ColorCheckbox.css';

interface IColorCheckbox {
  value: string;
  checked: boolean;
  color: string;
  className: string;
  onChange: (value: string, isTrue: boolean) => void;
}

export const ColorCheckbox: React.FC<IColorCheckbox> = function ({ value, checked, color, className, onChange }) {
  return (
    <label className={`${className}__check color-check`} style={{ backgroundColor: color }}>
      <span className="visually-hidden">{value}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          onChange(value, event.target.checked);
        }}
        className="color-check__checkbox visually-hidden"
      />
      <span className="color-check__checked" />
    </label>
  );
};
