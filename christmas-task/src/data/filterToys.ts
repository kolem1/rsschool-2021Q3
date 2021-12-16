import { IFilterConfig, IRangeFilter, IToy, IValueFilter } from '../types/index';
import { SortMode } from '../enums';

function sort<T extends { name: string; year: number }>(sortMode: string, data: T[]) {
  const sorted = [...data].sort((a, b) => {
    switch (sortMode) {
      case SortMode[1]:
        return a.name.localeCompare(b.name);
      case SortMode[2]:
        return b.name.localeCompare(a.name);
      case SortMode[3]:
        return a.year - b.year;
      case SortMode[4]:
        return b.year - a.year;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return sorted;
}

function filterValues(valueFilter: IValueFilter, toy: IToy) {
  const filters = Object.entries(valueFilter).map((props) => {
    let isSuitable = false;

    const key = props[0];
    const values = props[1];
    if (Array.isArray(values)) {
      if (!values.length) return true;
      values.forEach((value) => {
        if (toy[key] === value) {
          isSuitable = true;
        }
      });
    } else if (!values) {
      isSuitable = true;
    } else if (values === toy[key]) {
      isSuitable = true;
    }

    return isSuitable;
  });

  const isSuitable = !filters.includes(false);

  return isSuitable;
}

function filterRanges(rangeFilter: IRangeFilter, toy: IToy) {
  const filters = Object.entries(rangeFilter).map((props: [string, { min: number; max: number }]) => {
    const key = props[0];
    const params = props[1];

    const value = toy[key] as number;
    return value >= params.min && value <= params.max;
  });

  const isSuitable = !filters.includes(false);

  return isSuitable;
}

function search(searchQuery: string, toys: IToy[]) {
  return toys.filter((toy) => toy.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

export default function filterToys(filterConfig: IFilterConfig, initialData: IToy[], searchQuery: string): IToy[] {
  let filtered = [...initialData].filter((item) => {
    const { valueFilter, rangeFilter } = filterConfig;

    const valuesIsSuitable = filterValues(valueFilter, item);

    const rangesIsSuitable = filterRanges(rangeFilter, item);

    return valuesIsSuitable && rangesIsSuitable;
  });
  filtered = sort(filterConfig.sortMode, filtered);

  const searchedAndFiltered = search(searchQuery, filtered);

  return searchedAndFiltered;
}
