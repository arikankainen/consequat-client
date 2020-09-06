import styled, { css } from 'styled-components';
import { NotificationType } from '../../reducers/notificationReducer';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 65px;
  z-index: 1001;
  cursor: pointer;
`;

export const MessageBox = styled.div`
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

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  flex-shrink: 0;

  & > svg {
    height: 40px;
    margin-right: 20px;
  }

  ${props =>
    props.type === NotificationType.Message &&
    css`
      & > svg {
        color: var(--color-success);
      }
  `}

  ${props =>
    props.type === NotificationType.Error &&
    css`
      & > svg {
        color: var(--color-error);
      }
  `}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Topic = styled.div`
  margin-bottom: 5px;
  font-size: 20px;
  color: #000;
  line-height: 1;
`;

export const Body = styled.div`
  color: #000;
  line-height: 1;
`;
