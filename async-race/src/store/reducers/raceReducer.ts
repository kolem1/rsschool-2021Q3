import { IRaceState, RaceAction, RaseActionTypes } from '../../types/race';

const initialState: IRaceState = {
  raceIsStarted: false,
  winnerIsVacant: false,
  winner: null,
  results: 0
};

export const raceReducer = (state = initialState, action: RaceAction): IRaceState => {
  switch (action.type) {
    case RaseActionTypes.START_RACE:
      return { ...state, raceIsStarted: true, winnerIsVacant: true };
    case RaseActionTypes.FINISH_RACE:
      return initialState;
    case RaseActionTypes.ADD_RESULT:
      if (state.winnerIsVacant) {
        return {
          ...state,
          winner: action.raceResult,
          winnerIsVacant: false,
          results: state.results + 1
        };
      }
      return { ...state, results: state.results + 1 };
    case RaseActionTypes.CHECK_IN:
      return { ...state, results: state.results + 1 };
    default:
      return state;
  }
};
