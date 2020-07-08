import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';

import Logo from './Logo';
import { LoginLink } from './Styles';
import { HeaderContainer } from './Styles';

const Header = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  console.log(loginStatus);

  return (
    <HeaderContainer>
      <Logo />
      <LoginLink to='/login'>Login</LoginLink>
    </HeaderContainer>
  );
};

export default Header;