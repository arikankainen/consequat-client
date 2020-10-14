import { combineReducers } from 'redux';
import { systemReducer } from 'reducers/systemReducer';
import { notificationReducer } from 'reducers/notificationReducer';
import { pictureReducer } from 'reducers/pictureReducer';
import { photoListReducer } from 'reducers/photoListReducer';
import { myPhotosReducer } from 'reducers/myPhotosReducer';

export const rootReducer = combineReducers({
  system: systemReducer,
  notification: notificationReducer,
  picture: pictureReducer,
  photoList: photoListReducer,
  myPhotos: myPhotosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
