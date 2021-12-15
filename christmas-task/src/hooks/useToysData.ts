import { useState, useEffect } from 'react';
import getToysData from '../data/getToysData';
import useLocalStorage from './useLocalStorage';
import { IFilterConfig, IToy } from '../types/index';
import { SortMode } from '../enums';
import filterToys from '../data/filterToys';

const defaultFilterConfig: IFilterConfig = {
  sortMode: SortMode[0],
  valueFilter: {
    color: [],
    shape: [],
    size: [],
    favorite: [],
  },
  rangeFilter: {
    count: {
      from: 1,
      to: 12,
    },
    year: {
      from: 1940,
      to: 2020,
    },
  },
};

export default function useToysData(
  initialValue: IToy[]
): [
  filteredToys: IToy[],
  filterConfig: IFilterConfig,
  setFilterConfig: React.Dispatch<React.SetStateAction<IFilterConfig>>
] {
  const [toysData, setToysData] = useState<IToy[]>(initialValue);

  useEffect(() => {
    getToysData(setToysData);
  }, []);

  const [filterConfig, setFilterConfig] = useLocalStorage<IFilterConfig>('kolem1-toysFilter', defaultFilterConfig);
  const [filteredToys, setFilteredToys] = useState<IToy[]>([]);

  useEffect(() => {
    const filtered = filterToys(filterConfig, toysData);
    setFilteredToys(filtered);
  }, [toysData, filterConfig]);

  return [filteredToys, filterConfig, setFilterConfig];
}
