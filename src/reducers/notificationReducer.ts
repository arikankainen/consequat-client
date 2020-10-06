import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from 'reducers/rootReducer';

const TIMEOUT = 5000;
let timeoutID: number | null = null;

export enum NotificationType {
  Message,
  Error,
}

interface NotificationState {
  notificationType: NotificationType;
  topic: string | null;
  text: string | null;
}

export const initialState: NotificationState = {
  notificationType: NotificationType.Message,
  topic: null,
  text: null,
};

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export interface SetNotification {
  type: typeof SET_NOTIFICATION;
  data: NotificationState;
}

type ThunkType = ThunkAction<void, RootState, unknown, Action<string>>;

export const clearNotification = (): SetNotification => {
  return {
    type: SET_NOTIFICATION,
    data: initialState,
  };
};

export const setMessage = (topic: string, text: string): ThunkType => {
  if (timeoutID != null) {
    clearTimeout(timeoutID);
    clearNotification();
  }

  return async dispatch => {
    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, TIMEOUT);

    dispatch({
      type: SET_NOTIFICATION,
      data: {
        notificationType: NotificationType.Message,
        topic,
        text,
      },
    });
  };
};

export const setError = (topic: string, text: string): ThunkType => {
  if (timeoutID != null) {
    clearTimeout(timeoutID);
    clearNotification();
  }

  return async dispatch => {
    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, TIMEOUT);

    dispatch({
      type: SET_NOTIFICATION,
      data: {
        notificationType: NotificationType.Error,
        topic,
        text,
      },
    });
  };
};

export const notificationReducer = (
  state = initialState,
  action: SetNotification
): NotificationState => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
