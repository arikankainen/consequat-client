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
import { LoginLink } from './Styles';
import { HeaderContainer } from './Styles';
import Search from './Search';

import { ReactComponent as UserIcon } from '../../images/menu_user.svg';
import { ReactComponent as AccountIcon } from '../../images/menu_settings.svg';
import { ReactComponent as ThemeIcon } from '../../images/menu_theme.svg';
import { ReactComponent as LogoutIcon } from '../../images/menu_logout.svg';
import { ReactComponent as PicturesIcon } from '../../images/menu_image.svg';

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
      text: 'Theme',
      subText: 'Change between dark and light',
      link: '/theme',
      icon: ThemeIcon,
    },
    {
      text: 'Log out',
      subText: loginStatus.loggedUser?.username,
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
    top: 61,
    direction: Direction.Right,
  };

  return (
    <HeaderContainer>
      <Logo />
      <Search />
      {loginStatus.loggedIn && 
        <Menu
          button={userMenuButton}
          items={userMenuItems}
          settings={userMenuSettings}
        />
      }
      {!loginStatus.loggedIn && <LoginLink to='/login'>Log In</LoginLink>}
    </HeaderContainer>
  );
};

export default Header;