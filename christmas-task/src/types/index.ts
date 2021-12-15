export interface IToy {
  [key: string]: string | boolean;
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface IValueFilter {
  [key: string]: string[] | boolean[];
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean[];
}

export interface IRangeFilter {
  count: {
    from: number;
    to: number;
  };
  year: {
    from: number;
    to: number;
  };
}

export interface IFilterConfig {
  sortMode: string;
  valueFilter: IValueFilter;
  rangeFilter: IRangeFilter;
}
