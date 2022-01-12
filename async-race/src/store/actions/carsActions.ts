import { Dispatch } from 'redux';
import { Car, CarsAction, CarsActionTypes } from '../../types/cars';

export const fetchCars = (page = 1, limit = 10) => {
  return async (dispatch: Dispatch<CarsAction>) => {
    try {
      dispatch({ type: CarsActionTypes.FETCH_CARS });
      const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`);
      const data = (await response.json()) as Car[];
      setTimeout(() => {
        dispatch({ type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: data });
      }, 500);
    } catch (e) {
      dispatch({
        type: CarsActionTypes.FETCH_CARS_ERROR,
        payload: 'Произошла ошибка при загрузке списка дел'
      });
    }
  };
};

export function setCarsPage(page: number): CarsAction {
  return { type: CarsActionTypes.SET_CARS_PAGE, payload: page };
}
