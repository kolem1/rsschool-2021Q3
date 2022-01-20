export interface IRaceResult {
  id: number;
  time: number;
  result: { succes: true };
}

export interface IRaceState {
  raceIsStarted: boolean;
  winnerIsVacant: boolean;
  winner: IRaceResult | null;
}

export enum RaseActionTypes {
  START_RACE = 'START_RACE',
  CLOSE_WINNER_VACANCY = 'CLOSE_WINNER_VACANCY',
  FINISH_RACE = 'FINISH_RACE',
  ADD_RESULT = 'ADD_RESULT'
}

interface IStartRaceAction {
  type: RaseActionTypes.START_RACE;
}

interface IFinishRaceAction {
  type: RaseActionTypes.FINISH_RACE;
}

interface IAddResultAction {
  type: RaseActionTypes.ADD_RESULT;
  raceResult: IRaceResult;
}

export type RaceAction = IStartRaceAction | IFinishRaceAction | IAddResultAction;
