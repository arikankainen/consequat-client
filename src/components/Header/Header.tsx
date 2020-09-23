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

import {
  HeaderContainer,
  HeaderInnerContainer,
  LeftContainer,
  RightContainer,
  StyledLink,
} from './style';

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
      icon: ConsequatIcon,
    },
    {
      text: 'Browse',
      subText: 'Browse all photos',
      link: '/photos',
      icon: BrowseIcon,
    },
    {
      text: 'About',
      subText: 'What Consequat is?',
      link: '/about',
      icon: AboutIcon,
    },
  ];

  const mainMenuButton = {
    text: 'Consequat',
    icon: MenuIcon,
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
      subText: 'Add new pictures',
      link: '/upload',
      icon: UploadIcon,
    },
    {
      text: 'My photos',
      subText: 'Browse your own photos',
      link: '/myphotos',
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
    direction: Direction.Right,
  };

  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <LeftContainer>
          <Menu
            button={mainMenuButton}
            items={mainMenuItems}
            settings={mainMenuSettings}
          />
          <Logo />
        </LeftContainer>
        <Search />
        <RightContainer>
          <StyledLink to="/photos">Browse</StyledLink>
          <StyledLink to="/about" style={{ marginRight: '20px' }}>
            About
          </StyledLink>
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
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Header;
