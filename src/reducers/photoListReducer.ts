import { PhotoUserExtended } from 'utils/types';

export const UPDATE_TOTAL_COUNT = 'UPDATE_TOTAL_COUNT';
export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';

export interface PhotoListState {
  totalCount: number;
  photos: PhotoUserExtended[];
}

const initialState: PhotoListState = {
  totalCount: 0,
  photos: [],
};

interface UpdateTotalCount {
  type: typeof UPDATE_TOTAL_COUNT;
  data: number;
}

interface UpdatePhotos {
  type: typeof UPDATE_PHOTOS;
  data: PhotoUserExtended[];
}

type Actions = UpdateTotalCount | UpdatePhotos;

export const updateTotalCount = (totalCount: number): UpdateTotalCount => {
  return {
    type: UPDATE_TOTAL_COUNT,
    data: totalCount,
  };
};

export const updatePhotos = (photos: PhotoUserExtended[]): UpdatePhotos => {
  return {
    type: UPDATE_PHOTOS,
    data: photos,
  };
};

export const photoListReducer = (
  state = initialState,
  action: Actions
): PhotoListState => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return {
        totalCount: state.totalCount,
        photos: [...action.data],
      };
    case UPDATE_TOTAL_COUNT:
      return {
        totalCount: action.data,
        photos: [...state.photos],
      };
    default:
      return state;
  }
};
