import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { updateLogin } from 'reducers/systemReducer';
import { setMessage, setError } from 'reducers/notificationReducer';
import storageToken from 'utils/storageToken';
import { LOGIN, ME } from 'utils/queries';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordInput } from './components/Inputs/Inputs';
import Button from 'components/Button/Button';
import * as Styled from './style';

const Login = () => {
  const loginState = useSelector((state: RootState) => state.system);
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
    onError: error => {
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
      storageToken.setToken(token);
      me();
    }
  }, [resultLogin.data, history]); // eslint-disable-line

  useEffect(() => {
    if (resultMe.data) {
      dispatch(
        updateLogin({
          loggedIn: true,
          loggedToken: storageToken.getToken(),
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
          'Logged in',
          `${resultMe.data.me.fullname} logged in successfully.`
        )
      );
      history.replace(loginState.previousPage);
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
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Styled.OuterContainer>
      <Styled.Container>
        <Styled.Topic>Log in</Styled.Topic>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextInput name="username" label="Username" />
            <PasswordInput name="password" label="Password" />
            <Button
              type="submit"
              text={buttonText}
              disabled={disabled}
              onClick={() => void 0}
              margin={[20, 0, 0, 0]}
              fullWidth
            />
            <Styled.QuestionArea>
              <Styled.QuestionLink to="/signup">
                Not registered yet? Sign up!
              </Styled.QuestionLink>
            </Styled.QuestionArea>
          </Form>
        </Formik>
      </Styled.Container>
    </Styled.OuterContainer>
  );
};

export default Login;
