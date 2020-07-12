import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';

import { OuterContainer, Container, Topic }  from './Styles';

const LogoutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearLogin());
    storage.clearToken();

    setTimeout(() => {
      history.push('/');
    }, 1500);

  }, []);  // eslint-disable-line

  return (
    <OuterContainer>
      <Container>
        <Topic>Log Out</Topic>
        Logging out...
      </Container>
    </OuterContainer>
  );
};

export default LogoutPage;