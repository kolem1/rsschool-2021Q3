import React, { useState, useEffect } from 'react';
import './Select.css';

interface IOption {
  value: string;
  name: string;
}

interface ISelect {
  value: string;
  options: IOption[];
  setValue: (value: string) => void;
}

export const Select: React.FC<ISelect> = function ({ value, options, setValue }) {
  const curentOption = options.find((option) => option.value === value) as IOption;
  const [showOptionList, setShowOptionList] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('custom-select__option') && !target.classList.contains('custom-select__text')) {
      setShowOptionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className="custom-select">
      <div
        className={showOptionList ? 'custom-select__text active' : 'custom-select__text'}
        onClick={() => setShowOptionList(!showOptionList)}
        onKeyDown={(e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            setShowOptionList(true);
          }
        }}
        role="listbox"
        tabIndex={0}
      >
        {curentOption.name}
      </div>
      {showOptionList && (
        <ul className="custom-select__options">
          {options.map((option) => {
            return (
              <li
                tabIndex={0}
                className="custom-select__option"
                data-value={option.value}
                key={option.value}
                onClick={() => {
                  setValue(option.value);
                  setShowOptionList(false);
                }}
                onKeyDown={(e) => {
                  if (e.code === 'Space') {
                    e.preventDefault();
                    setValue(option.value);
                    setShowOptionList(false);
                  }
                }}
                role="option"
                aria-selected={option === curentOption}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
