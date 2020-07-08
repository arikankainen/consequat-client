import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

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

const ErrorNotification = styled.div`
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

const Input = styled.input`
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

const Button = styled.button`
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      token
    }
  }
`;

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

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loginButtonText, setLoginButtonText] = useState<string>('Login');
  const [error, setError] = useState<string | null>(null);

  const loggingIn = (logging: boolean): void => {
    if (logging) {
      setDisabled(true);
      setLoginButtonText('Logging in...');
    }
    else {
      setDisabled(false);
      setLoginButtonText('Login');
    }
  };

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      loggingIn(false);
      setError('Invalid username or password');
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token;
      console.log(token);
      loggingIn(false);
    }
  }, [result.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loggingIn(true);

    if (!username) {
      setError('Username required');
      loggingIn(false);
    }
    else if (!password) {
      setError('Password required');
      loggingIn(false);
    }
    else {
      // temporarily added delay to see disabled form elements when login in progress, TODO: delete from product version
      setTimeout(() => {
        login({ variables: { username, password } });
      }, 1000);
    }
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPassword(e.target.value);
  };

  return (
    <OuterContainer>
      <Container>
        <Topic>Login</Topic>
        <form onSubmit={handleSubmit}>
          <Error message={error}>Invalid email or password</Error>
          <Input disabled={disabled} placeholder='Username' onChange={handleUsernameChange}/><br />
          <Input disabled={disabled} placeholder='Password' type='password' onChange={handlePasswordChange} /><br />
          <Button disabled={disabled} type='submit'>{loginButtonText}</Button>
        </form>
      </Container>
    </OuterContainer>
  );
};

export default LoginPage;