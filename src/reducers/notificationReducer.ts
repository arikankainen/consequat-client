export enum NotificationType {
  Message,
  Error
}

interface NotificationState {
  notificationType: NotificationType;
  topic: string | null;
  text: string | null;
}

const initialState: NotificationState = {
  notificationType: NotificationType.Message,
  topic: null,
  text: null
};

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export interface SetNotification {
  type: typeof SET_NOTIFICATION;
  data: NotificationState;
}

export const setNotification = (data: NotificationState): SetNotification => {
  return {
    type: SET_NOTIFICATION,
    data
  };
};

export const clearNotification = (): SetNotification => {
  return {
    type: SET_NOTIFICATION,
    data: initialState
  };
};

export const notificationReducer = (state = initialState, action: SetNotification): NotificationState => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};