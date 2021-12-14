import React from 'react';
import { SortMode } from '../../enums';
import { IFilterConfig } from '../../types';
import { Select } from '../UI/Select/Select';

interface IFilterProps {
  filterConfig: IFilterConfig;
  setFilterConfig: (filterConfig: IFilterConfig) => void;
}

export const Filter: React.FC<IFilterProps> = function ({ filterConfig, setFilterConfig }) {
  const sortOptions = [
    {
      value: SortMode[1],
      name: 'По имени от А до Я',
    },
    {
      value: SortMode[2],
      name: 'По имени от Я до А',
    },
    {
      value: SortMode[3],
      name: 'По году по возрастанию',
    },
    {
      value: SortMode[4],
      name: 'По году по убыванию',
    },
  ];

  return (
    <div className="filter">
      <div className="filter__column">
        <h2 className="filterTitle">Фильтры по значению</h2>
      </div>
      <div className="filter__column">
        <h2 className="filterTitle">Фильтры по диапазону</h2>
      </div>
      <div className="filter__column">
        <h2 className="filterTitle">Сортировка</h2>
        <Select
          value={filterConfig.sortMode}
          onChange={(value: string) => {
            setFilterConfig({ ...filterConfig, sortMode: value });
          }}
          options={sortOptions}
        />
      </div>
    </div>
  );
};
