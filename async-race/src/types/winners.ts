import { ICar } from './cars';

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type IWinnerView = IWinner & ICar;

export enum SortType {
  id = 'id',
  wins = 'wins',
  time = 'time'
}
export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface IWinnersState {
  winners: IWinnerView[];
  total: number;
  loading: boolean;
  error: null | string;
  sort: SortType;
  order: OrderType;
  page: number;
}

export enum WinnersActionTypes {
  FETCH_WINNERS = 'FETCH_WINNERS',
  FETCH_WINNERS_SUCCESS = 'FETCH_WINNERS_SUCCESS',
  FETCH_WINNERS_ERROR = 'FETCH_WINNERS_ERROR',
  SET_WINNERS_PAGE = 'SET_WINNERS_PAGE',
  SET_SORT_AND_ORDER_TYPE = 'SET_SORT_AND_ORDER_TYPE'
}
interface IFetchWinnersAction {
  type: WinnersActionTypes.FETCH_WINNERS;
}
interface IFetchWinnersSuccessAction {
  type: WinnersActionTypes.FETCH_WINNERS_SUCCESS;
  payload: { data: IWinnerView[]; total: number };
}
interface IFetchWinnersErrorAction {
  type: WinnersActionTypes.FETCH_WINNERS_ERROR;
  payload: string;
}
interface ISetWinnersPage {
  type: WinnersActionTypes.SET_WINNERS_PAGE;
  payload: number;
}
interface ISetWinnersSortAndOrder {
  type: WinnersActionTypes.SET_SORT_AND_ORDER_TYPE;
  payload: {
    sort: SortType;
    order: OrderType;
  };
}

export type WinnersAction =
  | IFetchWinnersAction
  | IFetchWinnersErrorAction
  | IFetchWinnersSuccessAction
  | ISetWinnersPage
  | ISetWinnersSortAndOrder;
