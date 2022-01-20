import { IRaceState, RaceAction, RaseActionTypes } from '../../types/race';

const initialState: IRaceState = {
  raceIsStarted: false,
  winnerIsVacant: false,
  winner: null
};

export const raceReducer = (state = initialState, action: RaceAction): IRaceState => {
  switch (action.type) {
    case RaseActionTypes.START_RACE:
      return { ...state, raceIsStarted: true, winnerIsVacant: true };
    case RaseActionTypes.FINISH_RACE:
      return { ...state, raceIsStarted: false };
    case RaseActionTypes.ADD_RESULT:
      if (state.winnerIsVacant) {
        return { ...state, winner: action.raceResult, winnerIsVacant: false };
      }
      return state;
    default:
      return state;
  }
};
