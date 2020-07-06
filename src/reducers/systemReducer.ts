import { User } from '../utils/types';

interface SystemState {
  loggedIn: boolean;
  token: string;
  user: User | null;
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

const initialState: SystemState = {
  loggedIn: false,
  token: '',
  user: null
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