import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';
import { ME } from '../../utils/queries';
import Logo from './Logo';
import { LoginLink } from './Styles';
import { HeaderContainer } from './Styles';

const Header = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  const dispatch =  useDispatch();
  
  const [me, resultMe] = useLazyQuery(ME);

  useEffect(() => {
    if (!loginStatus.loggedIn && storage.getToken()) {
      me();
    }
  }, [loginStatus, me]);

  useEffect(() => {
    if (resultMe.data) {
      dispatch(updateLogin({
        loggedIn: true,
        loggedToken: localStorage.getItem('consequat-token') as string,
        loggedUser: {
          username: resultMe.data.me.username,
          email: resultMe.data.me.email,
          fullname: resultMe.data.me.fullname,
          isAdmin: resultMe.data.me.isAdmin,
          id: resultMe.data.me.id
        }
      }));
    }
  }, [resultMe.data]); // eslint-disable-line

  return (
    <HeaderContainer>
      <Logo />
      <LoginLink to='/login'>Login</LoginLink>
    </HeaderContainer>
  );
};

export default Header;