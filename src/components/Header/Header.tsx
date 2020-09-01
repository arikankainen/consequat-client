import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';
import { ME } from '../../utils/queries';
import Logo from './Logo';
import Menu, { Direction } from '../Menu/Menu';
import Search from './Search';
import MenuButton from '../Buttons/MenuButton';

import { ReactComponent as UserIcon } from '../../images/menu_user.svg';
import { ReactComponent as AccountIcon } from '../../images/menu_settings.svg';
import { ReactComponent as LogoutIcon } from '../../images/menu_logout.svg';
import { ReactComponent as PicturesIcon } from '../../images/menu_image.svg';
import { ReactComponent as UploadIcon } from '../../images/menu_upload.svg';
import { ReactComponent as LoginIcon } from '../../images/menu_login.svg';
import { HeaderContainer, LeftContainer, RightContainer } from './style';

const Header = () => {
  const loginState = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();
  const [me, resultMe] = useLazyQuery(ME);

  useEffect(() => {
    if (!loginState.loggedIn && storage.getToken()) {
      me();
    }
  }, [loginState]); // eslint-disable-line

  useEffect(() => {
    if (resultMe.data) {
      dispatch(
        updateLogin({
          loggedIn: true,
          loggedToken: storage.getToken(),
          loggedUser: {
            username: resultMe.data.me.username,
            email: resultMe.data.me.email,
            fullname: resultMe.data.me.fullname,
            isAdmin: resultMe.data.me.isAdmin,
            id: resultMe.data.me.id,
          },
        })
      );
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
      <LeftContainer>
        <Logo />
      </LeftContainer>
      <Search />
      <RightContainer>
        {loginState.loggedIn ? (
          <Menu
            button={userMenuButton}
            items={userMenuItems}
            settings={userMenuSettings}
          />
        ) : (
          <MenuButton to="/login" text="Login" icon={LoginIcon} />
        )}
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
