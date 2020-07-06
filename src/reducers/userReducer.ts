import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

type State = string | null;

interface ActionType {
  type: string;
  data: string;
}

const userReducer = (state: State = null, action: ActionType) => {
  switch (action.type) {
  case 'TEST_ACTION':
    return action.data;
  default:
    return state;
  }
};

export const testAction: ActionCreator<Action> = (test: string) => {
  return {
    type: 'TEST_ACTION',
    data: test
  };
};

/*
export const thunkAction: ActionCreator<ThunkAction<Action, string, void>> = () => {
  return async dispatch => {
    dispatch(
      {
        type: 'TEST_ACTION',
        data: 'testdata'
      }
    )
  };
};
*/

export default userReducer;