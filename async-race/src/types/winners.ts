import { ICar } from './cars';

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type IWinnerView = IWinner & ICar;

export interface IWinnersState {
  cars: IWinnerView[];
  total: number;
  loading: boolean;
  error: null | string;
  page: number;
}

export enum WinnersActionTypes {
  FETCH_WINNERS = 'FETCH_WINNERS',
  FETCH_WINNERS_SUCCESS = 'FETCH_WINNERS_SUCCESS',
  FETCH_WINNERS_ERROR = 'FETCH_WINNERS_ERROR',
  SET_WINNERS_PAGE = 'SET_WINNERS_PAGE'
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

export type WinnersAction =
  | IFetchWinnersAction
  | IFetchWinnersErrorAction
  | IFetchWinnersSuccessAction
  | ISetWinnersPage;
