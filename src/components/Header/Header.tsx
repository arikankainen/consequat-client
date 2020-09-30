import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../reducers/systemReducer';
import storage from '../../utils/storage';
import { ME } from '../../utils/queries';
import Logo from '../HeaderLogo/Logo';
import Menu, { Direction } from '../Menu/Menu';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import MenuButton from '../MenuButton/MenuButton';
import * as Styled from './style';

import { ReactComponent as UserIcon } from '../../images/user-solid.svg';
import { ReactComponent as AccountIcon } from '../../images/cog-solid.svg';
import { ReactComponent as LogoutIcon } from '../../images/sign-out-alt-solid.svg';
import { ReactComponent as PicturesIcon } from '../../images/camera-solid.svg';
import { ReactComponent as UploadIcon } from '../../images/upload-solid.svg';
import { ReactComponent as LoginIcon } from '../../images/sign-in-alt-solid.svg';
import { ReactComponent as MenuIcon } from '../../images/consequat_o.svg';
import { ReactComponent as ConsequatIcon } from '../../images/consequat_o.svg';
import { ReactComponent as BrowseIcon } from '../../images/globe-solid.svg';
import { ReactComponent as AboutIcon } from '../../images/question-circle-solid.svg';

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

  const mainMenuItems = [
    {
      text: 'Consequat',
      subText: 'Back to the starting point',
      link: '/',
      Icon: ConsequatIcon,
    },
    {
      text: 'Browse',
      subText: 'Browse all photos',
      link: '/photos',
      Icon: BrowseIcon,
    },
    {
      text: 'About',
      subText: 'What Consequat is?',
      link: '/about',
      Icon: AboutIcon,
    },
  ];

  const mainMenuButton = {
    text: 'Consequat',
    Icon: MenuIcon,
    iconColor: '#d68b1e',
    iconColorHover: '#ffaf45',
  };

  const mainMenuSettings = {
    classNames: 'usermenu',
    direction: Direction.Left,
    hideWhen: 601,
  };

  const userMenuItems = [
    {
      text: 'Upload',
      subText: 'Add new photos',
      link: '/upload',
      Icon: UploadIcon,
    },
    {
      text: 'My photos',
      subText: 'Manage your photos',
      link: '/myphotos',
      Icon: PicturesIcon,
    },
    {
      text: 'Account',
      subText: 'View account settings',
      link: '/account',
      Icon: AccountIcon,
    },
    {
      text: 'Log out',
      subText: loginState.loggedUser?.fullname || '',
      link: '/logout',
      Icon: LogoutIcon,
    },
  ];

  const userMenuButton = {
    text: 'User menu',
    Icon: UserIcon,
  };

  const userMenuSettings = {
    classNames: 'usermenu',
    direction: Direction.Right,
  };

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderInnerContainer>
        <Styled.LeftContainer>
          <Menu
            button={mainMenuButton}
            items={mainMenuItems}
            settings={mainMenuSettings}
          />
          <Logo />
        </Styled.LeftContainer>
        <HeaderSearch />
        <Styled.RightContainer>
          <Styled.HeaderLink to="/photos">Browse</Styled.HeaderLink>
          <Styled.HeaderLink to="/about" style={{ marginRight: '20px' }}>
            About
          </Styled.HeaderLink>
          {loginState.loggedIn ? (
            <Menu
              button={userMenuButton}
              items={userMenuItems}
              settings={userMenuSettings}
            />
          ) : (
            <MenuButton to="/login" text="Login" Icon={LoginIcon} />
          )}
        </Styled.RightContainer>
      </Styled.HeaderInnerContainer>
    </Styled.HeaderContainer>
  );
};

export default Header;
