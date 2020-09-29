import { LoggedUser } from '../utils/types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers/rootReducer';

interface SystemState {
  loggedIn: boolean;
  loggedToken: string | null;
  loggedUser: LoggedUser | null;
  previousPage: string;
}

interface UpdateData {
  loggedIn: boolean;
  loggedToken: string | null;
  loggedUser: LoggedUser | null;
}

const initialState: SystemState = {
  loggedIn: false,
  loggedToken: null,
  loggedUser: null,
  previousPage: '/',
};

export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const SET_PREVIOUS = 'SET_PREVIOUS';

export interface UpdateLogin {
  type: typeof UPDATE_LOGIN;
  data: UpdateData;
}

export interface SetPrevious {
  type: typeof SET_PREVIOUS;
  data: string;
}

type Actions = UpdateLogin | SetPrevious;

export const updateLogin = (data: UpdateData): UpdateLogin => {
  return {
    type: UPDATE_LOGIN,
    data,
  };
};

export const clearLogin = (): UpdateLogin => {
  return {
    type: UPDATE_LOGIN,
    data: initialState,
  };
};

export const updateLoginThunk = (
  data: UpdateData
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(updateLogin(data));
};

export const setPrevious = (data: string): SetPrevious => {
  return {
    type: SET_PREVIOUS,
    data,
  };
};

export const systemReducer = (
  state = initialState,
  action: Actions
): SystemState => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return {
        ...state,
        ...action.data,
      };
    case SET_PREVIOUS:
      return {
        ...state,
        previousPage: action.data,
      };
    default:
      return state;
  }
};
