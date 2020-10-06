import { Photo } from 'utils/types';

export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';

export interface PhotoListState {
  photos: Photo[];
}

const initialState: PhotoListState = {
  photos: [],
};

export interface UpdatePhotos {
  type: typeof UPDATE_PHOTOS;
  data: Photo[];
}

export const updatePhotos = (photos: Photo[]): UpdatePhotos => {
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
