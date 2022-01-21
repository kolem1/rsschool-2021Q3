import {
  WinnersAction,
  WinnersActionTypes,
  IWinnersState,
  SortType,
  OrderType
} from '../../types/winners';

const initialState: IWinnersState = {
  winners: [],
  total: 0,
  page: 1,
  error: null,
  sort: SortType.id,
  order: OrderType.ASC,
  loading: false
};

export const winnersReducer = (state = initialState, action: WinnersAction): IWinnersState => {
  switch (action.type) {
    case WinnersActionTypes.FETCH_WINNERS:
      return { ...state, loading: true };
    case WinnersActionTypes.FETCH_WINNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        winners: action.payload.data,
        total: action.payload.total
      };
    case WinnersActionTypes.FETCH_WINNERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case WinnersActionTypes.SET_WINNERS_PAGE:
      return { ...state, page: action.payload };
    case WinnersActionTypes.SET_SORT_AND_ORDER_TYPE:
      return { ...state, sort: action.payload.sort, order: action.payload.order };
    default:
      return state;
  }
};
