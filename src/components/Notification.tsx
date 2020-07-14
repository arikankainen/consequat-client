import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MessageIcon } from '../images/notification_message.svg';
import { ReactComponent as ErrorIcon } from '../images/notification_error.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 65px;
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 50%;
  padding: 15px 20px;
  background-color: var(--notification-message-bg-color);
  border-radius: 5px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: 2px;

  & > svg {
      height: 40px;
      margin-right: 20px;
      color: var(--icon-color);
    }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Topic = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  color: var(--default-font-color);
  line-height: 1;
`;

const Body = styled.div`
  color: var(--default-font-color-slightly-darker);
  line-height: 1;
`;

const Notification = () => {
  return (
    <Container>
      <MessageBox>
        <IconContainer>
          <MessageIcon />
        </IconContainer>
        <ContentContainer>
          <Topic>
            Message
          </Topic>
          <Body>
            Sample message, nothing to show.
          </Body>
        </ContentContainer>
      </MessageBox>
    </Container>
  );
};

export default Notification;