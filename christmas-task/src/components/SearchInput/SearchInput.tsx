import React from 'react';
import './SearchInput.css';

interface ISearchInput {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchInput = function ({ searchQuery, setSearchQuery }: ISearchInput) {
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
      />
      <button type="button" className="search-input__clear" onClick={() => setSearchQuery('')}>
        Очистить поиск
      </button>
    </div>
  );
};
