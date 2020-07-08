import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding: 20px;
  background-color: var(--navigation-bg-color);
  border: none;
  border-radius: var(--input-border-radius);
  text-align: center;
`;

export const Topic = styled.h1`
  margin-bottom: 10px;
  font-size: 22px;
  color: var(--accent-color-2);
  color: var(--accent-color-1);
  text-transform: uppercase;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #303032;
  border: 1px solid var(--bg-color);
  border-radius: var(--input-border-radius);
  color: var(--default-font-color);
  text-align: center;
  font-weight: 600;

  &:focus {
    outline-width: 0;
    background-color: #3b3b3d;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  background-color: var(--accent-color-2);
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline-width: 0;
  }

  &:hover {
    background-color: var(--accent-color-2-hover);
  }
  
  &:disabled {
    background-color: var(--accent-color-2);
    cursor: wait;
  }
`;

export const ErrorNotification = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 4px;
  background-color: #990000;
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  text-align: center;
`;