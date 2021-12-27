import React from 'react';
import './Checkbox.css';

interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<ICheckbox> = function ({ label, className, ...props }) {
  return (
    <label className={`${className}__check custom-checkbox`}>
      <span className="visually-hidden">{label}</span>
      <input type="checkbox" className={`${className}__checkbox custom-checkbox__input visually-hidden`} {...props} />
      <span className="custom-checkbox__checkmark" />
    </label>
  );
};
