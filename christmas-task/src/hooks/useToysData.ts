import { useState, useEffect } from 'react';
import getToysData from '../data/getToysData';
import useLocalStorage from './useLocalStorage';
import { IFilterConfig, IToy } from '../types/index';
import { SortMode } from '../enums';
import filterToys from '../data/filterToys';

const defaultFilterConfig: IFilterConfig = {
  sortMode: SortMode[0],
  valueFilter: undefined,
  rangeFilter: undefined,
};

export default function useToysData(
  initialValue: IToy[]
): [
  filteredToys: IToy[],
  filterConfig: IFilterConfig,
  setFilterConfig: React.Dispatch<React.SetStateAction<IFilterConfig>>
] {
  const [toysData, setToysData] = useState<IToy[]>(initialValue);
  const [filterConfig, setFilterConfig] = useLocalStorage<IFilterConfig>('kolem1-toysFilter', defaultFilterConfig);
  const [filteredToys, setFilteredToys] = useState<IToy[]>([]);

  useEffect(() => {
    getToysData(setToysData);
  }, []);

  useEffect(() => {
    const filtered = filterToys(filterConfig, toysData);
    setFilteredToys(filtered);
  }, [toysData, filterConfig]);

  return [filteredToys, filterConfig, setFilterConfig];
}
