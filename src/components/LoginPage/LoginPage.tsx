import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import storage from '../../utils/storage';
import { LOGIN } from '../../utils/queries';
import { OuterContainer, Container, Topic, Input, Button }  from './Styles';
import Message, { MessageType } from './Message';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loginButtonText, setLoginButtonText] = useState<string>('Login');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Success);
  const history = useHistory();

  const loggingProgress = (logging: boolean): void => {
    if (logging) {
      setDisabled(true);
      setLoginButtonText('Logging in...');
    }
    else {
      setDisabled(false);
      setLoginButtonText('Login');
    }
  };

  const [login, resultLogin] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      loggingProgress(false);
      setMessageType(MessageType.Error);
      setMessage('Invalid username or password');
    }
  });

  useEffect(() => {
    if (resultLogin.data) {
      const token = resultLogin.data.login.token;
      storage.setToken(token);

      setMessageType(MessageType.Success);
      setMessage('Successfully logged in');
      loggingProgress(false);

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  }, [resultLogin.data, history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loggingProgress(true);

    if (!username) {
      setMessageType(MessageType.Error);
      setMessage('Username required');
      loggingProgress(false);
    }
    else if (!password) {
      setMessageType(MessageType.Error);
      setMessage('Password required');
      loggingProgress(false);
    }
    else {
      // temporarily added delay to see disabled form elements when login in progress, TODO: delete from product version
      setTimeout(() => {
        login({ variables: { username, password } });
      }, 1500);
    }
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setPassword(e.target.value);
  };

  return (
    <OuterContainer>
      <Container>
        <Topic>Login</Topic>
        <form onSubmit={handleSubmit}>
          <Input disabled={disabled} placeholder='Username' onChange={handleUsernameChange}/><br />
          <Input disabled={disabled} placeholder='Password' type='password' onChange={handlePasswordChange} /><br />
          <Button disabled={disabled} type='submit'>{loginButtonText}</Button>
          <Message message={message} type={messageType}>Invalid email or password</Message>
        </form>
      </Container>
    </OuterContainer>
  );
};

export default LoginPage;