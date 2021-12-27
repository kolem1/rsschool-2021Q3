import { useState, useEffect } from 'react';
import getToysData from '../data/getToysData';
import useLocalStorage from './useLocalStorage';
import { IFilterConfig, IToy, FavoriteResponse } from '../types/index';
import { SortMode } from '../enums';
import filterToys from '../data/filterToys';

const defaultFilterConfig: IFilterConfig = {
  sortMode: SortMode[1],
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
  resetFilter: () => void,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setFavorite: (num: string) => FavoriteResponse,
  favoritesCount: number,
  resetAll: () => void,
  userFavorites: IToy[],
  setFavoriteToys: React.Dispatch<React.SetStateAction<string[]>>
] {
  const [toysData, setToysData] = useState<IToy[]>(initialValue);
  const [favoriteToys, setFavoriteToys] = useLocalStorage<string[]>('kolem1-favoriteToys', []);

  useEffect(() => {
    getToysData(setToysData);
  }, []);

  const [filterConfig, setFilterConfig] = useLocalStorage<IFilterConfig>('kolem1-toysFilter', defaultFilterConfig);
  const [filteredToys, setFilteredToys] = useState<IToy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const filtered = filterToys(filterConfig, toysData, searchQuery);
    filtered.forEach((toy) => {
      if (favoriteToys.includes(toy.num)) {
        /* eslint no-param-reassign: "error" */
        toy.userFavorite = true;
      }
    });
    setFilteredToys(filtered);
  }, [toysData, filterConfig, searchQuery, favoriteToys]);

  const resetFilter = () => {
    const { sortMode } = filterConfig;
    setFilterConfig({ ...defaultFilterConfig, sortMode });
  };

  const resetAll = () => {
    setFilterConfig(defaultFilterConfig);
    setFavoriteToys([]);
    setSearchQuery('');
  };

  const setFavorite = (num: string): FavoriteResponse => {
    if (favoriteToys.includes(num)) {
      setFavoriteToys(favoriteToys.filter((toy) => toy !== num));
      return 'deleted';
    }
    if (favoriteToys.length < 20) {
      setFavoriteToys(favoriteToys.concat(num));
      return 'added';
    }
    return 'full';
  };

  const getUserFavorites = () => {
    const favorites = favoriteToys.map((item) => {
      return toysData.find((toy) => toy.num === item);
    });
    return favorites.filter((toy) => toy) as IToy[];
  };

  const userFavorites = getUserFavorites();

  const favoritesCount = favoriteToys.length;

  return [
    filteredToys,
    filterConfig,
    setFilterConfig,
    resetFilter,
    searchQuery,
    setSearchQuery,
    setFavorite,
    favoritesCount,
    resetAll,
    userFavorites,
    setFavoriteToys,
  ];
}
