import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import TopNavigationContainer from './TopNavigationContainer';
import Logo from './Logo';
import Login from './Login';

const TopNavigation = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  console.log(loginStatus);

  return (
    <div>
      <TopNavigationContainer>
        <Logo />
        <Login />
      </TopNavigationContainer>
    </div>
  );
};

export default TopNavigation;