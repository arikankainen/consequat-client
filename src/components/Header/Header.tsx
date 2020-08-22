import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';
import { ME } from '../../utils/queries';
import Logo from './Logo';
import Menu, { Direction } from '../Menu';
import Search from './Search';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as UserIcon } from '../../images/menu_user.svg';
import { ReactComponent as AccountIcon } from '../../images/menu_settings.svg';
import { ReactComponent as LogoutIcon } from '../../images/menu_logout.svg';
import { ReactComponent as PicturesIcon } from '../../images/menu_image.svg';
import { ReactComponent as UploadIcon } from '../../images/menu_upload.svg';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  min-height: var(--header-height);
  background-color: var(--navigation-bg-color);
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1000;
`;

const EdgeContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
`;

const LoginLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  color: var(--accent-color-2);
  padding-right: 10px;
  padding-left: 10px;
  font-size: var(--default-font-size-bigger);
  font-weight: 600;
  white-space: nowrap;

  &:visited {
    color: var(--accent-color-2);
  }
  &:hover {
    color: var(--accent-color-2-hover);
  }
  
  flex-grow: 1;
`;

const Header = () => {
  const loginState = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();

  const [me, resultMe] = useLazyQuery(ME);

  useEffect(() => {
    if (!loginState.loggedIn && storage.getToken()) {
      me();
    }
  }, [loginState, me]);

  useEffect(() => {
    if (resultMe.data) {
      dispatch(updateLogin({
        loggedIn: true,
        loggedToken: storage.getToken(),
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

  const userMenuItems = [
    {
      text: 'Upload',
      subText: 'Add new pictures',
      link: '/upload',
      icon: UploadIcon,
    },
    {
      text: 'Pictures',
      subText: 'Browse your own pictures',
      link: '/pictures',
      icon: PicturesIcon,
    },
    {
      text: 'Account',
      subText: 'View account settings',
      link: '/account',
      icon: AccountIcon,
    },
    {
      text: 'Log out',
      subText: loginState.loggedUser?.fullname || '',
      link: '/logout',
      icon: LogoutIcon,
    },
  ];

  const userMenuButton = {
    text: 'User menu',
    icon: UserIcon,
  };

  const userMenuSettings = {
    classNames: 'usermenu',
    top: '60px',
    direction: Direction.Right,
  };

  return (
    <HeaderContainer>
      <EdgeContainer>
        <Logo />
      </EdgeContainer>
      <Search />
      <EdgeContainer>
        {loginState.loggedIn &&
          <Menu
            button={userMenuButton}
            items={userMenuItems}
            settings={userMenuSettings}
          />
        }
        {!loginState.loggedIn && <LoginLink to='/login'>Log In</LoginLink>}
      </EdgeContainer>
    </HeaderContainer>
  );
};

export default Header;