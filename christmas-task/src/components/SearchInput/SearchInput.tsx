import React from 'react';
import './SearchInput.css';

interface ISearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchInput: React.FC<ISearchInput> = function ({ searchQuery, setSearchQuery, ...props }) {
  return (
    <div className="search-input">
      <input
        className="search-input__input"
        value={searchQuery}
        onChange={(e) => {
          if (setSearchQuery) setSearchQuery(e.target.value);
        }}
        type="text"
        placeholder="Введите поисковый запрос"
        {...props}
      />
      <button type="button" className="search-input__clear" onClick={() => setSearchQuery('')}>
        Очистить поиск
      </button>
    </div>
  );
};
