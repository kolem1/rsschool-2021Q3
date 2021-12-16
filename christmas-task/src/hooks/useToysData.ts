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
    favorite: false,
  },
  rangeFilter: {
    count: {
      min: 1,
      max: 12,
    },
    year: {
      min: 1940,
      max: 2020,
    },
  },
};

export default function useToysData(
  initialValue: IToy[]
): [
  filteredToys: IToy[],
  filterConfig: IFilterConfig,
  setFilterConfig: React.Dispatch<React.SetStateAction<IFilterConfig>>,
  resetFilter: () => void
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

  const resetFilter = () => setFilterConfig(defaultFilterConfig);

  return [filteredToys, filterConfig, setFilterConfig, resetFilter];
}
