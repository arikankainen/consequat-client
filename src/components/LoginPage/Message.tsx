import React from 'react';
import { ErrorNotification, SuccessNotification } from './Styles';

export enum MessageType {
  Error,
  Success
}

interface MessageProps {
  message: string | null;
  type: MessageType;
}

const Message: React.FC<MessageProps> = ({ message, type }) => {
  if (type == MessageType.Error) {
    return (
      <ErrorNotification>
        {message}
      </ErrorNotification>
    );
  }

  return (
    <SuccessNotification>
      {message}
    </SuccessNotification>
  );
};


export default Message;