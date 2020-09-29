import { combineReducers } from 'redux';
import { systemReducer } from '../reducers/systemReducer';
import { notificationReducer } from '../reducers/notificationReducer';
import { pictureReducer } from '../reducers/pictureReducer';
import { photoListReducer } from '../reducers/photoListReducer';

export const rootReducer = combineReducers({
  system: systemReducer,
  notification: notificationReducer,
  picture: pictureReducer,
  photoList: photoListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
