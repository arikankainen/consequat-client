import React from 'react';
import { ErrorNotification } from './Styles';

interface MessageProps {
  message: string | null;
}

const Error: React.FC<MessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <ErrorNotification>
      {message}
    </ErrorNotification>
  );
};


export default Error;