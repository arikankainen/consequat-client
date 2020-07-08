import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/queries';
import Error from './Error';
import { OuterContainer, Container, Topic, Input, Button }  from './Styles';

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