import { Dispatch } from 'redux';
import { ICar, CarsAction, CarsActionTypes } from '../../types/cars';

export const fetchCars = (page = 1, limit = 10) => {
  return async (dispatch: Dispatch<CarsAction>) => {
    try {
      dispatch({ type: CarsActionTypes.FETCH_CARS });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/garage?_page=${page}&_limit=${limit}`
      );
      const data = (await response.json()) as ICar[];
      const total = Number(response.headers.get('X-Total-Count'));
      dispatch({ type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: { data, total } });
    } catch (e) {
      dispatch({
        type: CarsActionTypes.FETCH_CARS_ERROR,
        payload: 'Произошла ошибка при загрузке'
      });
    }
  };
};

export function setCarsPage(page: number): CarsAction {
  return { type: CarsActionTypes.SET_CARS_PAGE, payload: page };
}
