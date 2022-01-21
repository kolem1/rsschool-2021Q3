import { WinnersAction, WinnersActionTypes, IWinnersState } from '../../types/winners';

const initialState: IWinnersState = {
  cars: [],
  total: 0,
  page: 1,
  error: null,
  loading: false
};

export const winnersReducer = (state = initialState, action: WinnersAction): IWinnersState => {
  switch (action.type) {
    case WinnersActionTypes.FETCH_WINNERS:
      return { ...state, loading: true };
    case WinnersActionTypes.FETCH_WINNERS_SUCCESS:
      return { ...state, loading: false, cars: action.payload.data, total: action.payload.total };
    case WinnersActionTypes.FETCH_WINNERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case WinnersActionTypes.SET_WINNERS_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
