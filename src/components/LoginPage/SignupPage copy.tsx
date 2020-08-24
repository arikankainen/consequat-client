import React, { useState, useEffect } from 'react';
import useField from '../../utils/useField';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SIGNUP } from '../../utils/queries';
import { setMessage, setError } from '../../reducers/notificationReducer';

import {
  OuterContainer,
  Container,
  Topic,
  Input,
  Button,
  QuestionArea,
  QuestionLink
}  from './Styles';

const SignupPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Sign up');
  const history = useHistory();
  const dispatch =  useDispatch();

  const username = useField('text', 'Username');
  const fullname = useField('text', 'Full name');
  const email = useField('email', 'E-mail');
  const password = useField('password', 'Password');

  const signingProgress = (logging: boolean): void => {
    if (logging) {
      setDisabled(true);
      setButtonText('Signing up...');
    }
    else {
      setDisabled(false);
      setButtonText('Sign up');
    }
  };

  const [signup, resultSignup] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      signingProgress(false);
      dispatch(setError('Error', 'Something went wrong...'));
    }
  });

  useEffect(() => {
    if (resultSignup.data) {
      dispatch(setMessage(
        'Sign up', `${resultSignup.data?.createUser.fullname} signed up successfully! Please log in.`
      ));
      history.replace('/login');
    }
  }, [resultSignup.data, history]);  // eslint-disable-line

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signingProgress(true);

    if (!username.value) {
      dispatch(setError('Error', 'Username required.'));
      signingProgress(false);
    }
    else if (!email.value) {
      dispatch(setError('Error', 'E-mail required.'));
      signingProgress(false);
    }
    else if (!fullname.value) {
      dispatch(setError('Error', 'Full name required.'));
      signingProgress(false);
    }
    else if (!password.value) {
      dispatch(setError('Error', 'Password required.'));
      signingProgress(false);
    }
    else {
      signup({ variables: {
        username: username.value,
        email: email.value,
        fullname: fullname.value,
        password: password.value
      } });
    }
  };

  return (
    <OuterContainer>
      <Container>
        <Topic>Sign up</Topic>
        <form onSubmit={handleSubmit}>
          <Input disabled={disabled} {...username} /><br />
          <Input disabled={disabled} {...fullname} /><br />
          <Input disabled={disabled} {...email} /><br />
          <Input disabled={disabled} {...password} /><br />
          <Button disabled={disabled} type='submit'>{buttonText}</Button>
          <QuestionArea>
            <QuestionLink to='/login'>
              Already registered? Log in.
            </QuestionLink>
          </QuestionArea>
        </form>
      </Container>
    </OuterContainer>
  );
};

export default SignupPage;