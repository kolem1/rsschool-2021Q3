import React from 'react';
import './ColorCheckbox.css';

interface IColorCheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  color: string;
  handleChange: (value: string, isTrue: boolean) => void;
}

export const ColorCheckbox: React.FC<IColorCheckbox> = function ({
  value,
  disabled,
  color,
  className,
  handleChange,
  ...rest
}) {
  return (
    <label
      className={`${className}__check color-check`}
      style={{ backgroundColor: color, opacity: disabled ? 0.5 : 1 }}
    >
      <span className="visually-hidden">{value}</span>
      <input
        type="checkbox"
        disabled={disabled}
        onChange={(event) => {
          handleChange(value, event.target.checked);
        }}
        className="color-check__checkbox visually-hidden"
        {...rest}
      />
      <span className="color-check__checked" />
    </label>
  );
};
