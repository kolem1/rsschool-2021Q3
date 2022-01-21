import { combineReducers } from 'redux';
import { carsReducer } from './carsReducer';
import { raceReducer } from './raceReducer';
import { winnersReducer } from './winnersReducer';

export const rootReducer = combineReducers({
  cars: carsReducer,
  race: raceReducer,
  winners: winnersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
