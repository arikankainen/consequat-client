export const ADD_PICTURE = 'ADD_PICTURE';
export const REMOVE_PICTURE = 'REMOVE_PICTURE';
export const CLEAR = 'CLEAR';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

export interface PictureWithData {
  picture: File;
  progress: number;
}

interface PictureState {
  pictures: PictureWithData[];
}

const initialState: PictureState = {
  pictures: []
};

export interface AddPicture {
  type: typeof ADD_PICTURE;
  data: File;
}

export interface RemovePicture {
  type: typeof REMOVE_PICTURE;
  data: string;
}

export interface Clear {
  type: typeof CLEAR;
}

export interface UpdateProgress {
  type: typeof UPDATE_PROGRESS;
  data: {
    filename: string;
    progress: number;
  };
}

type Actions = AddPicture | RemovePicture | Clear | UpdateProgress;

export const addPicture = (picture: File): AddPicture => {
  return {
    type: ADD_PICTURE,
    data: picture
  };
};

export const removePictures = (): Clear => {
  return {
    type: CLEAR,
  };
};

export const updateProgress = (filename: string, progress: number): UpdateProgress => {
  return {
    type: UPDATE_PROGRESS,
    data: {
      filename,
      progress
    }
  };
};

export const pictureReducer = (state = initialState, action: Actions): PictureState => {
  switch (action.type) {
    case ADD_PICTURE:
      return {
        pictures: [...state.pictures, { picture: action.data, progress: 0 }]
      };
    case REMOVE_PICTURE:
      return {
        pictures: [...state.pictures].filter(picture => picture.picture.name !== action.data)
      };
    case CLEAR:
      return {
        ...initialState
      };
    case UPDATE_PROGRESS:
      return {
        pictures: [...state.pictures].map(picture => {
          if (picture.picture.name === action.data.filename) {
            picture.progress = action.data.progress;
          }
          return picture;
        })
      };
    default:
      return state;
  }
};