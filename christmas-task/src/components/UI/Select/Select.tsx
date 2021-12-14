import React from 'react';

interface IOption {
  value: string;
  name: string;
}

interface ISelect {
  value: string;
  options: IOption[];
  onChange: (value: string) => void;
}

export const Select: React.FC<ISelect> = function ({ value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};
