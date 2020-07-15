export const ADD_PICTURE = 'ADD_PICTURE';
export const REMOVE_PICTURE = 'REMOVE_PICTURE';
export const CLEAR = 'CLEAR';

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

type Actions = AddPicture | RemovePicture | Clear;

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

export const pictureReducer = (state = initialState, action: Actions): PictureState => {
  switch (action.type) {
    case ADD_PICTURE:
      return {
        //pictures: [...state.pictures, action.data]
        pictures: [...state.pictures, { picture: action.data, progress: 0 }]
      };
    case REMOVE_PICTURE:
      return {
        //pictures: [...state.pictures].filter(picture => picture.name !== action.data)
        pictures: [...state.pictures].filter(picture => picture.picture.name !== action.data)
      };
    case CLEAR:
      return {
        ...initialState
      };
    default:
      return state;
  }
};