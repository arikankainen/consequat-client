import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { NotificationType } from '../reducers/notificationReducer';
import { CSSTransition } from 'react-transition-group';
import { clearNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

import { ReactComponent as MessageIcon } from '../images/notification_message.svg';
import { ReactComponent as ErrorIcon } from '../images/notification_error.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 65px;
  z-index: 999;
  cursor: pointer;
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 5px;
  padding: 15px 20px;
  background-color: var(--notification-message-bg-color);
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
`;

interface IconContainerProps {
  type: NotificationType;
}

const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  flex-shrink: 0;

  & > svg {
      height: 40px;
      margin-right: 20px;
      
      ${props => props.type === NotificationType.Message
        && css`
        color: var(--color-success);
      `}

      ${props => props.type === NotificationType.Error
        && css`
        color: var(--color-error);
      `}
    }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Topic = styled.div`
  margin-bottom: 5px;
  font-size: 20px;
  color: var(--default-font-color);
  line-height: 1;
`;

const Body = styled.div`
  color: var(--default-font-color-slightly-darker);
  line-height: 1;
`;

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
  }
  else if (!open) {
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
      classNames='notification'
    >
      <Container onClick={handleClick}>
        <MessageBox>
          <IconContainer type={type}>
            {type === NotificationType.Message ? <MessageIcon /> : <ErrorIcon />}
          </IconContainer>
          <ContentContainer>
            <Topic>
              {topic}
            </Topic>
            <Body>
              {text}
            </Body>
          </ContentContainer>
        </MessageBox>
      </Container>
    </CSSTransition>
  );
};

export default Notification;