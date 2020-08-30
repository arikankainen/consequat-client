import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';
import { Link } from 'react-router-dom';

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  ${breakPoints.mobileL} {
    align-items: flex-start;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  padding-bottom: 15px;
  background-color: var(--navigation-bg-color);
  border: none;
  border-radius: var(--input-border-radius);
  text-align: center;

  ${breakPoints.mobileL} {
    width: 100%;
    margin: 20px;
  }
`;

export const Topic = styled.h1`
  font-size: 24px;
  color: var(--accent-color-2);
  color: var(--accent-color-1);
  text-transform: uppercase;
  font-weight: 300;
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  background-color: var(--accent-color-2);
  border: 1px solid var(--navigation-bg-color);
  border-radius: var(--input-border-radius);
  color: #eee;
  font-size: var(--default-font-size);
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: var(--focus);
  }

  &:hover {
    background-color: var(--accent-color-2-hover);
  }
  
  &:disabled {
    background-color: var(--accent-color-2);
    cursor: wait;
  }
`;

export const QuestionArea = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

export const QuestionLink = styled(Link)`
  text-decoration: none;
  color: var(--default-font-color);
  
  &:visited {
    color: var(--default-font-color);
  }
  &:hover {
    color: var(--default-font-color-highlight);
  }

`;

export const ErrorNotification = styled.div`
  margin-top: 5px;
  height: 25px;
  margin-bottom: -10px;
  color: #cc5555;
`;

export const SuccessNotification = styled(ErrorNotification)`
  color: #55cc55;
`;