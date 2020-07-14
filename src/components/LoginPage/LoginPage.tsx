import React, { useState, useEffect } from 'react';
import useField from '../../utils/useField';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';
import { LOGIN, ME } from '../../utils/queries';

import { OuterContainer, Container, Topic, Input, Button }  from './Styles';
import Message, { MessageType } from './Message';

const LoginPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Log in');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Success);
  const history = useHistory();
  const dispatch =  useDispatch();

  const username = useField('text', 'Username');
  const password = useField('password', 'Password');

  const loggingProgress = (logging: boolean): void => {
    if (logging) {
      setDisabled(true);
      setButtonText('Logging in...');
    }
    else {
      setDisabled(false);
      setButtonText('Log in');
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

  const [me, resultMe] = useLazyQuery(ME, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (resultLogin.data) {
      const token = resultLogin.data.login.token;
      storage.setToken(token);
      me();
    }
  }, [resultLogin.data, history]);  // eslint-disable-line

  useEffect(() => {
    if (resultMe.data) {
      dispatch(updateLogin({
        loggedIn: true,
        loggedToken: storage.getToken(),
        loggedUser: {
          username: resultMe.data.me.username,
          email: resultMe.data.me.email,
          fullname: resultMe.data.me.fullname,
          isAdmin: resultMe.data.me.isAdmin,
          id: resultMe.data.me.id
        }
      }));
      
      history.replace('/');
    }
  }, [resultMe.data]); // eslint-disable-line


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loggingProgress(true);

    if (!username.value) {
      setMessageType(MessageType.Error);
      setMessage('Username required');
      loggingProgress(false);
    }
    else if (!password.value) {
      setMessageType(MessageType.Error);
      setMessage('Password required');
      loggingProgress(false);
    }
    else {
      // temporarily added delay to see disabled form elements when login in progress, TODO: delete from product version
      setTimeout(() => {
        login({ variables: { username: username.value, password: password.value } });
      }, 1500);
    }
  };
  
  return (
    <OuterContainer>
      <Container>
        <Topic>Log in</Topic>
        <form onSubmit={handleSubmit}>
          <Input disabled={disabled} {...username}/><br />
          <Input disabled={disabled} {...password} /><br />
          <Button disabled={disabled} type='submit'>{buttonText}</Button>
          <Message message={message} type={messageType}>Invalid email or password</Message>
        </form>
      </Container>
    </OuterContainer>
  );
};

export default LoginPage;