import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../reducers/systemReducer';
import { setMessage, setError } from '../../reducers/notificationReducer';
import storage from '../../utils/storage';
import { LOGIN, ME } from '../../utils/queries';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from './Inputs';

import {
  OuterContainer,
  Container,
  Topic,
  Input,
  Button,
  QuestionArea,
  QuestionLink
} from './Styles';

const LoginPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Log in');
  const history = useHistory();
  const dispatch = useDispatch();

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
      dispatch(setError('Error', 'Invalid username or password.'));
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

      dispatch(setMessage('Log in', `${resultMe.data.me.fullname} logged in successfully.`));
      history.replace('/');
    }
  }, [resultMe.data]); // eslint-disable-line


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loggingProgress(true);

    //login({ variables: { username: username.value, password: password.value } });
  };

  interface Values {
    username: string;
    password: string;
  }

  const initialValues: Values = {
    username: '',
    password: ''
  };

  return (
    <OuterContainer>
      <Container>
        <Topic>Log in</Topic>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values, actions);
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <TextInput
              type="text"
              id="username"
              name="username"
              label="Username"
              placeholder="Username"
            />
            <TextInput
              type="text"
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <button type="submit">Log in</button>
          </Form>

        </Formik>
      </Container>
    </OuterContainer>
  );
};

export default LoginPage;