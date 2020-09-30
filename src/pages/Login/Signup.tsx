import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SIGNUP } from '../../utils/queries';
import { setMessage, setError } from '../../reducers/notificationReducer';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordInput } from './Inputs';
import Button from '../../components/Button/Button';

import {
  OuterContainer,
  Container,
  Topic,
  QuestionArea,
  QuestionLink,
} from './style';

const Signup = () => {
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
        dispatch(
          setError('Error', 'Username is already taken. Please choose another.')
        );
      } else {
        dispatch(setError('Error', 'Something went wrong...'));
      }
    },
  });

  useEffect(() => {
    if (resultSignup.data) {
      dispatch(
        setMessage(
          'Signed up',
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
    passwordConfirmation: string;
  }

  const initialValues: FormValues = {
    username: '',
    email: '',
    fullname: '',
    password: '',
    passwordConfirmation: '',
  };

  const validation = Yup.object({
    username: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Must be valid email')
      .required('Email is required'),
    fullname: Yup.string().required('Full name is required'),
    password: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('Passwords must match')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
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
            <TextInput name="email" label="Email" />
            <PasswordInput name="password" label="Password" />
            <PasswordInput
              name="passwordConfirmation"
              label="Confirm password"
            />
            <Button
              type="submit"
              text={buttonText}
              disabled={disabled}
              onClick={() => void 0}
              margin={[20, 0, 0, 0]}
              fullWidth
            />
            <QuestionArea>
              <QuestionLink to="/login">
                Already registered? Log in.
              </QuestionLink>
            </QuestionArea>
          </Form>
        </Formik>
      </Container>
    </OuterContainer>
  );
};

export default Signup;
