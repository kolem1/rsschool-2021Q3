import { CarsAction, CarsActionTypes, ICarsState } from '../../types/cars';

const initialState: ICarsState = {
  cars: [],
  total: 0,
  page: 1,
  error: null,
  loading: false
};

export const carsReducer = (state = initialState, action: CarsAction): ICarsState => {
  switch (action.type) {
    case CarsActionTypes.FETCH_CARS:
      return { ...state, loading: true };
    case CarsActionTypes.FETCH_CARS_SUCCESS:
      return { ...state, loading: false, cars: action.payload.data, total: action.payload.total };
    case CarsActionTypes.FETCH_CARS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CarsActionTypes.SET_CARS_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
