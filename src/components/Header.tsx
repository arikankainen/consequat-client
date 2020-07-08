import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import styled from 'styled-components';

import Logo from './Logo';
import LoginLink from './LoginLink';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: var(--navigation-bg-color);
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = () => {
  const loginStatus = useSelector((state: RootState) => state.system);
  console.log(loginStatus);

  return (
    <div>
      <HeaderContainer>
        <Logo />
        <LoginLink />
      </HeaderContainer>
    </div>
  );
};

export default Header;