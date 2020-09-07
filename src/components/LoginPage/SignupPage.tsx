import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SIGNUP } from '../../utils/queries';
import { setMessage, setError } from '../../reducers/notificationReducer';

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

const SignupPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Sign up');
  const history = useHistory();
  const dispatch = useDispatch();

  const signingProgress = (logging: boolean): void => {
    if (logging) {
      setDisabled(true);
      setButtonText('Signing up...');
    } else {
      setDisabled(false);
      setButtonText('Sign up');
    }
  };

  const [signup, resultSignup] = useMutation(SIGNUP, {
    onError: error => {
      console.log(error.graphQLErrors[0].message);
      signingProgress(false);
      const errorText = error.graphQLErrors[0].message;
      if (errorText.includes('expected `username` to be unique')) {
        dispatch(setError('Error', 'Username is already taken. Please choose another.'));
      } else {
        dispatch(setError('Error', 'Something went wrong...'));
      }
    },
  });

  useEffect(() => {
    if (resultSignup.data) {
      dispatch(
        setMessage(
          'Sign up',
          `${resultSignup.data?.createUser.fullname} signed up successfully! Please log in.`
        )
      );
      history.replace('/login');
    }
  }, [resultSignup.data, history]); // eslint-disable-line

  const handleSubmit = (values: FormValues) => {
    signingProgress(true);

    signup({
      variables: {
        username: values.username,
        email: values.email,
        fullname: values.fullname,
        password: values.password,
      },
    });
  };

  interface FormValues {
    username: string;
    email: string;
    fullname: string;
    password: string;
  }

  const initialValues: FormValues = {
    username: '',
    email: '',
    fullname: '',
    password: '',
  };

  const validation = Yup.object({
    username: Yup.string().min(3, 'must be at least 3 characters').required('required'),
    email: Yup.string().email('must be valid e-mail').required('required'),
    fullname: Yup.string().required('required'),
    password: Yup.string().min(5, 'must be at least 5 characters').required('required'),
  });

  return (
    <OuterContainer>
      <Container>
        <Topic>Sign up</Topic>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextInput name="username" label="Username" />
            <TextInput name="fullname" label="Full name" />
            <TextInput name="email" label="E-mail" />
            <PasswordInput name="password" label="Password" />
            <Button type="submit" disabled={disabled}>
              {buttonText}
            </Button>
            <QuestionArea>
              <QuestionLink to="/login">Already registered? Log in.</QuestionLink>
            </QuestionArea>
          </Form>
        </Formik>
      </Container>
    </OuterContainer>
  );
};

export default SignupPage;
