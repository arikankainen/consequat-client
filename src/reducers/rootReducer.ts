import { combineReducers } from 'redux';
import { systemReducer } from '../reducers/systemReducer';
import { notificationReducer } from '../reducers/notificationReducer';
import { pictureReducer } from '../reducers/pictureReducer';

export const rootReducer = combineReducers({
  system: systemReducer,
  notification: notificationReducer,
  picture: pictureReducer,
});

export type RootState = ReturnType<typeof rootReducer>;