import { IFilterConfig, IRangeFilter, IToy, IValueFilter } from '../types/index';
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
  let isSuitable = true;

  Object.entries(rangeFilter).forEach((props) => {
    const key = props[0];
    const values = props[1];
    isSuitable = false;

    const value = Number(toy[key]);

    if (value <= values.to && value >= values.from) {
      isSuitable = true;
    }
  });

  return isSuitable;
}

export default function filterToys(filterConfig: IFilterConfig, initialData: IToy[]): IToy[] {
  let filtered = [...initialData].filter((item) => {
    const { valueFilter, rangeFilter } = filterConfig;

    const valuesIsSuitable = filterValues(valueFilter, item);

    const rangesIsSuitable = filterRanges(rangeFilter, item);

    return valuesIsSuitable && rangesIsSuitable;
  });
  filtered = sort(filterConfig.sortMode, filtered);

  return filtered;
}
