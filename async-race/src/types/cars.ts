export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarsState {
  cars: Car[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum CarsActionTypes {
  FETCH_CARS = 'FETCH_CARS',
  FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS',
  FETCH_CARS_ERROR = 'FETCH_CARS_ERROR',
  SET_CARS_PAGE = 'SET_CARs_PAGE'
}
interface FetchCarsAction {
  type: CarsActionTypes.FETCH_CARS;
}
interface FetchCarsSuccessAction {
  type: CarsActionTypes.FETCH_CARS_SUCCESS;
  payload: Car[];
}
interface FetchCarsErrorAction {
  type: CarsActionTypes.FETCH_CARS_ERROR;
  payload: string;
}
interface SetCarsPage {
  type: CarsActionTypes.SET_CARS_PAGE;
  payload: number;
}

export type CarsAction =
  | FetchCarsAction
  | FetchCarsErrorAction
  | FetchCarsSuccessAction
  | SetCarsPage;
