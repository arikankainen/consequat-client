import React, { useState } from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
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

const Topic = styled.h1`
  margin-bottom: 10px;
  font-size: 22px;
  color: var(--accent-color-2);
  color: var(--accent-color-1);
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #303032;
  border: 1px solid var(--bg-color);
  border-radius: var(--input-border-radius);
  color: var(--default-font-color);

  &:focus {
    outline-width: 0;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 10px;
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
`;

const LoginPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <OuterContainer>
      <Container>
        <Topic>Login</Topic>
        <form onSubmit={handleSubmit}>
          <Input placeholder='Username' onChange={handleUsernameChange}/><br />
          <Input placeholder='Password' type='password' onChange={handlePasswordChange} /><br />
          <Button type='submit'>Login</Button>
        </form>
      </Container>
    </OuterContainer>
  );
};

export default LoginPage;