import { combineReducers } from 'redux';
import { carsReducer } from './carsReducer';
import { raceReducer } from './raceReducer';

export const rootReducer = combineReducers({
  cars: carsReducer,
  race: raceReducer
});

export type RootState = ReturnType<typeof rootReducer>;
