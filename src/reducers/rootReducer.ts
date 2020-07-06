import { combineReducers } from 'redux';
import { systemReducer } from '../reducers/systemReducer';

export const rootReducer = combineReducers({
  system: systemReducer
});

export type RootState = ReturnType<typeof rootReducer>;