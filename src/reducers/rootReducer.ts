import { combineReducers } from 'redux';
import { systemReducer } from '../reducers/systemReducer';
import { notificationReducer } from '../reducers/notificationReducer';

export const rootReducer = combineReducers({
  system: systemReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;