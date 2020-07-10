import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';

const LogoutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearLogin());
    storage.clearToken();

    setTimeout(() => {
      history.push('/');
    }, 1000);

  }, []);  // eslint-disable-line

  return (
    <div>Logging out...</div>
  );
};

export default LogoutPage;