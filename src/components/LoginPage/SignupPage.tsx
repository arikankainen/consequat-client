import React, { useState, useEffect } from 'react';
import useField from '../../utils/useField';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../utils/queries';

import { OuterContainer, Container, Topic, Input, Button }  from './Styles';
import Message, { MessageType } from './Message';

const SignupPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Sign up');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Success);
  const history = useHistory();

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
      setMessageType(MessageType.Error);
      setMessage('Something went wrong...');
    }
  });

  useEffect(() => {
    if (resultSignup.data) {
      history.push('/login');
    }
  }, [resultSignup.data, history]);  // eslint-disable-line

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signingProgress(true);

    if (!username.value) {
      setMessageType(MessageType.Error);
      setMessage('Username required');
      signingProgress(false);
    }
    else if (!email.value) {
      setMessageType(MessageType.Error);
      setMessage('E-mail required');
      signingProgress(false);
    }
    else if (!fullname.value) {
      setMessageType(MessageType.Error);
      setMessage('Full name required');
      signingProgress(false);
    }
    else if (!password.value) {
      setMessageType(MessageType.Error);
      setMessage('Password required');
      signingProgress(false);
    }
    else {
      // temporarily added delay to see disabled form elements when signup in progress, TODO: delete from product version
      setTimeout(() => {
        signup({ variables: {
          username: username.value,
          email: email.value,
          fullname: fullname.value,
          password: password.value
        } });
      }, 1500);
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
          <Message message={message} type={messageType}>Invalid email or password</Message>
        </form>
      </Container>
    </OuterContainer>
  );
};

export default SignupPage;