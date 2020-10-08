import { PhotoUserExtended } from 'utils/types';

export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';

export interface PhotoListState {
  photos: PhotoUserExtended[];
}

const initialState: PhotoListState = {
  photos: [],
};

export interface UpdatePhotos {
  type: typeof UPDATE_PHOTOS;
  data: PhotoUserExtended[];
}

export const updatePhotos = (photos: PhotoUserExtended[]): UpdatePhotos => {
  return {
    type: UPDATE_PHOTOS,
    data: photos,
  };
};

export const photoListReducer = (
  state = initialState,
  action: UpdatePhotos
): PhotoListState => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return {
        photos: [...action.data],
      };
    default:
      return state;
  }
};
