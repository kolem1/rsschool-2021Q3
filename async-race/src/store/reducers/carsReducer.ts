import { CarsAction, CarsActionTypes, CarsState } from '../../types/cars';

const initialState: CarsState = {
  cars: [],
  page: 1,
  error: null,
  limit: 10,
  loading: false
};

export const carsReducer = (state = initialState, action: CarsAction): CarsState => {
  switch (action.type) {
    case CarsActionTypes.FETCH_CARS:
      return { ...state, loading: true };
    case CarsActionTypes.FETCH_CARS_SUCCESS:
      return { ...state, loading: false, cars: action.payload };
    case CarsActionTypes.FETCH_CARS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CarsActionTypes.SET_CARS_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
