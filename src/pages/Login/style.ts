import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';
import { Link } from 'react-router-dom';

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  ${breakPoints.mobileXL} {
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
  background-color: #fff;
  border: none;
  border-radius: var(--input-border-radius);
  text-align: center;
  box-shadow: var(--default-box-shadow);

  ${breakPoints.mobileXL} {
    width: 100%;
    height: 100%;
    margin: 0px;
    border-radius: 0px;
    box-shadow: none;
  }
`;

export const Topic = styled.h1`
  font-family: var(--topic-font-family);
  font-size: 24px;
  color: #000;
  font-weight: 200;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  background-color: var(--accent-color-2);
  border: 1px solid var(--accent-color-2);
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
  color: #000;
  
  &:visited {
    color: #000;
  }
  &:hover {
    color: var(--accent-color-2);
  }

`;
