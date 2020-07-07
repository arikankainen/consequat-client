import { User } from '../utils/types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers/rootReducer';

interface SystemState {
  loggedIn: boolean;
  loggedToken: string;
  loggedUser: User | null;
}

export const UPDATE_LOGIN = 'UPDATE_LOGIN';

export interface UpdateLogin {
  type: typeof UPDATE_LOGIN;
  data: SystemState;
}

export const updateLogin = (data: SystemState): UpdateLogin => {
  return {
    type: UPDATE_LOGIN,
    data: data
  };
};

export const updateLoginThunk = (
  data: SystemState
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(updateLogin(data));
};

const initialState: SystemState = {
  loggedIn: false,
  loggedToken: '',
  loggedUser: null
};

export const systemReducer = (state = initialState, action: UpdateLogin): SystemState => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};