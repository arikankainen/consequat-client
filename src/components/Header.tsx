import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import HeaderContainer from './HeaderContainer';
import Logo from './Logo';
import LoginLink from './LoginLink';

const Header = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  console.log(loginStatus);

  return (
    <HeaderContainer>
      <Logo />
      <LoginLink />
    </HeaderContainer>
  );
};

export default Header;