import { IRaceResult, RaceAction, RaseActionTypes } from '../../types/race';

export function startRace(): RaceAction {
  return { type: RaseActionTypes.START_RACE };
}

export function stopRace(): RaceAction {
  return { type: RaseActionTypes.FINISH_RACE };
}

export function addResult(raceResult: IRaceResult): RaceAction {
  return { type: RaseActionTypes.ADD_RESULT, raceResult };
}
