export interface ICarParams {
  name: string;
  color: string;
}

export interface ICar extends ICarParams {
  id: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface ICarsState {
  cars: ICar[];
  total: number;
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export interface IEngine {
  velocity: number;
  distance: number;
}

export interface IDrivedEngine {
  succes: true;
}

export type EngineResponse = IEngine | IDrivedEngine;

export enum CarsActionTypes {
  FETCH_CARS = 'FETCH_CARS',
  FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS',
  FETCH_CARS_ERROR = 'FETCH_CARS_ERROR',
  SET_CARS_PAGE = 'SET_CARs_PAGE',
  CREATE_CAR = 'CREATE_CAR'
}
interface IFetchCarsAction {
  type: CarsActionTypes.FETCH_CARS;
}
interface IFetchCarsSuccessAction {
  type: CarsActionTypes.FETCH_CARS_SUCCESS;
  payload: { data: ICar[]; total: number };
}
interface IFetchCarsErrorAction {
  type: CarsActionTypes.FETCH_CARS_ERROR;
  payload: string;
}
interface ISetCarsPage {
  type: CarsActionTypes.SET_CARS_PAGE;
  payload: number;
}

export type CarsAction =
  | IFetchCarsAction
  | IFetchCarsErrorAction
  | IFetchCarsSuccessAction
  | ISetCarsPage;
