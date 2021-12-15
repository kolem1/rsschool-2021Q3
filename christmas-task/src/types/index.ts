export interface IToy {
  [key: string]: string | boolean | number;
  num: string;
  name: string;
  count: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface IValueFilter {
  [key: string]: string[] | boolean;
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
}

export interface IRangeFilter {
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
