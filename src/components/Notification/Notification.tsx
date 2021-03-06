import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { NotificationType } from 'reducers/notificationReducer';
import { CSSTransition } from 'react-transition-group';
import { clearNotification } from 'reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { ReactComponent as MessageIcon } from 'images/exclamation-circle-solid.svg';
import { ReactComponent as ErrorIcon } from 'images/exclamation-triangle-solid.svg';
import * as Styled from './style';

const Notification = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [type, setType] = useState<NotificationType>(NotificationType.Message);
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearNotification());
  };

  if (!notification.text) {
    if (open) {
      setOpen(false);
    }
  } else if (!open) {
    setTopic(notification.topic);
    setText(notification.text);
    setType(notification.notificationType);
    setOpen(true);
  }

  if (notification.text && notification.text !== text) {
    setTopic(notification.topic);
    setText(notification.text);
    setType(notification.notificationType);
  }

  return (
    <CSSTransition
      in={open}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames="notification"
    >
      <Styled.Container onClick={handleClick}>
        <Styled.MessageBox>
          <Styled.IconContainer type={type}>
            {type === NotificationType.Message ? (
              <MessageIcon />
            ) : (
              <ErrorIcon />
            )}
          </Styled.IconContainer>
          <Styled.ContentContainer>
            <Styled.Topic>{topic}</Styled.Topic>
            <Styled.Body>{text}</Styled.Body>
          </Styled.ContentContainer>
        </Styled.MessageBox>
      </Styled.Container>
    </CSSTransition>
  );
};

export default Notification;
