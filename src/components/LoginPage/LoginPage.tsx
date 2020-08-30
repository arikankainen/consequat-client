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
import { TextInput, PasswordInput } from './Inputs';

import {
  OuterContainer,
  Container,
  Topic,
  Button,
  QuestionArea,
  QuestionLink,
} from './style';

const LoginPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Log in');
  const history = useHistory();
  const dispatch = useDispatch();

  const loggingProgress = (logging: boolean) => {
    if (logging) {
      setDisabled(true);
      setButtonText('Logging in...');
    } else {
      setDisabled(false);
      setButtonText('Log in');
    }
  };

  const [login, resultLogin] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      loggingProgress(false);
      dispatch(setError('Error', 'Invalid username or password.'));
    },
  });

  const [me, resultMe] = useLazyQuery(ME, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (resultLogin.data) {
      const token = resultLogin.data.login.token;
      storage.setToken(token);
      me();
    }
  }, [resultLogin.data, history]); // eslint-disable-line

  useEffect(() => {
    if (resultMe.data) {
      dispatch(
        updateLogin({
          loggedIn: true,
          loggedToken: storage.getToken(),
          loggedUser: {
            username: resultMe.data.me.username,
            email: resultMe.data.me.email,
            fullname: resultMe.data.me.fullname,
            isAdmin: resultMe.data.me.isAdmin,
            id: resultMe.data.me.id,
          },
        })
      );

      dispatch(
        setMessage(
          'Log in',
          `${resultMe.data.me.fullname} logged in successfully.`
        )
      );
      history.replace('/');
    }
  }, [resultMe.data]); // eslint-disable-line

  const handleSubmit = (values: FormValues) => {
    loggingProgress(true);
    login({
      variables: { username: values.username, password: values.password },
    });
  };

  interface FormValues {
    username: string;
    password: string;
  }

  const initialValues: FormValues = {
    username: '',
    password: '',
  };

  const validation = Yup.object({
    username: Yup.string()
      .min(3, 'must be at least 3 characters')
      .required('required'),
    password: Yup.string()
      .min(5, 'must be at least 5 characters')
      .required('required'),
  });

  return (
    <OuterContainer>
      <Container>
        <Topic>Log in</Topic>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextInput name="username" label="Username" />
            <PasswordInput name="password" label="Password" />
            <Button type="submit" disabled={disabled}>
              {buttonText}
            </Button>
            <QuestionArea>
              <QuestionLink to="/signup">
                Not registered yet? Sign up!
              </QuestionLink>
            </QuestionArea>
          </Form>
        </Formik>
      </Container>
    </OuterContainer>
  );
};

export default LoginPage;
