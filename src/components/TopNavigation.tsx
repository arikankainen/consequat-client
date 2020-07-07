import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import TopNavigationContainer from './TopNavigationContainer';
import Logo from './Logo';
import LoginLink from './LoginLink';

const TopNavigation = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  console.log(loginStatus);

  return (
    <div>
      <TopNavigationContainer>
        <Logo />
        <LoginLink />
      </TopNavigationContainer>
    </div>
  );
};

export default TopNavigation;