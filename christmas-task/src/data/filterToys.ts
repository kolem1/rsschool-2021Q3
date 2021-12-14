import { IFilterConfig, IToy } from '../types/index';
import { SortMode } from '../enums';

function sort<T extends { name: string; year: string }>(sortMode: string, data: T[]) {
  const sorted = [...data].sort((a, b) => {
    switch (sortMode) {
      case SortMode[1]:
        return a.name.localeCompare(b.name);
      case SortMode[2]:
        return b.name.localeCompare(a.name);
      case SortMode[3]:
        return Number(a.year) - Number(b.year);
      case SortMode[4]:
        return Number(b.year) - Number(a.year);
      default:
        return 0;
    }
  });

  return sorted;
}

export default function filterToys(filterConfig: IFilterConfig, initialData: IToy[]): IToy[] {
  let filtered = [...initialData].filter((item) => item.name);
  filtered = sort(filterConfig.sortMode, filtered);

  return filtered;
}
