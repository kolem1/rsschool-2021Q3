import { Dispatch } from 'redux';
import { getCar } from '../../api';
import {
  IWinner,
  IWinnerView,
  OrderType,
  SortType,
  WinnersAction,
  WinnersActionTypes
} from '../../types/winners';

export const fetchWinners = (page = 1, sort = SortType.id, order = OrderType.ASC, limit = 10) => {
  return async (dispatch: Dispatch<WinnersAction>) => {
    try {
      dispatch({ type: WinnersActionTypes.FETCH_WINNERS });
      const winnersResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
      );
      const winners = (await winnersResponse.json()) as IWinner[];

      const winnersViewPromises = winners.map(async (winner): Promise<IWinnerView> => {
        const car = await getCar(winner.id);

        return { ...winner, name: car.name, color: car.color };
      });
      const winnersView: IWinnerView[] = await Promise.all(winnersViewPromises);

      const total = Number(winnersResponse.headers.get('X-Total-Count'));

      dispatch({
        type: WinnersActionTypes.FETCH_WINNERS_SUCCESS,
        payload: { data: winnersView, total }
      });
    } catch (e) {
      dispatch({
        type: WinnersActionTypes.FETCH_WINNERS_ERROR,
        payload: 'Произошла ошибка при загрузке'
      });
    }
  };
};

export function setSortAndOrder(sort: SortType, order: OrderType) {
  return { type: WinnersActionTypes.SET_SORT_AND_ORDER_TYPE, payload: { sort, order } };
}

export function setWinnersPage(page: number): WinnersAction {
  return { type: WinnersActionTypes.SET_WINNERS_PAGE, payload: page };
}
