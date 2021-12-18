export interface IToy {
  [key: string]: string | boolean | number | undefined;
  num: string;
  name: string;
  count: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
  userFavorite?: boolean;
}

export interface IValueFilter {
  [key: string]: string[] | boolean;
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
}

export interface IRangeFilter {
  [key: string]: {
    min: number;
    max: number;
  };
  count: {
    min: number;
    max: number;
  };
  year: {
    min: number;
    max: number;
  };
}

export interface IFilterConfig {
  sortMode: string;
  valueFilter: IValueFilter;
  rangeFilter: IRangeFilter;
}

export type FavoriteResponse = 'deleted' | 'added' | 'full';
