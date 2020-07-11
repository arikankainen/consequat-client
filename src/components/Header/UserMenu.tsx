import React, { useState } from 'react';
import { ReactComponent as UserIcon } from '../../images/menu_user.svg';
import { ReactComponent as SettingsIcon } from '../../images/menu_settings.svg';
import { ReactComponent as ThemeIcon } from '../../images/menu_theme.svg';
import { ReactComponent as LogoutIcon } from '../../images/menu_logout.svg';
import { MenuButton } from './Styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Ul = styled.ul`
  position: absolute;
  top: 61px;
  right: 1px;
  padding: 0px 0px;
  background-color: var(--navigation-bg-color);
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid #111;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: var(--default-font-color);

  &:visited {
    color: var(--default-font-color);
  }
  &:hover {
    color: var(--default-font-color);
    background-color: var(--navigation-bg-color-hover);
  }

  & > svg {
    height: var(--icon-size);
    margin-right: 15px;
    color: var(--icon-color);
  }

  transition: all 200ms linear;
`;

const MenuTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuTextUpperText = styled.div`
  font-size: var(--default-font-size);
  color: var(--default-font-color);
  line-height: 1.1;
`;

const MenuTextLowerText = styled.div`
  font-size: var(--default-font-size-smaller);
  color: var(--default-font-color-darker);
  line-height: 1.1;
`;

interface MenuTextProps {
  text: string | undefined;
  subText: string | undefined;
}

const MenuText: React.FC<MenuTextProps> = ({ text, subText }) => {
  return (
    <MenuTextContainer>
      <MenuTextUpperText>{text}</MenuTextUpperText>
      <MenuTextLowerText>{subText}</MenuTextLowerText>
    </MenuTextContainer>
  );
};

interface UserMenuProps {
  username: string | undefined;
}

const Menu: React.FC<UserMenuProps> = ({ username }) => {
  return (
    <Ul>
      <Li>
        <MenuLink to='/account'>
          <SettingsIcon />
          <MenuText text='Account' subText='View account settings' />
        </MenuLink>
      </Li>

      <Li>
        <MenuLink to='/theme'>
          <ThemeIcon />
          <MenuText text='Theme' subText='Change between dark and light' />
        </MenuLink>
      </Li>
      
      <Li>
        <MenuLink to='/logout'>
          <LogoutIcon />
          <MenuText text='Logout' subText={username} />
        </MenuLink>
      </Li>
    </Ul>
  );
};

const UserMenu: React.FC<UserMenuProps> = ({ username }) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeMenu = () => {
    document.removeEventListener('click', closeMenu);
    setOpen(false);
  };

  const toggleMenu = () => {
    if (!open) {
      document.addEventListener('click', closeMenu);
      setOpen(true);
    } else {
      document.removeEventListener('click', closeMenu);
      setOpen(false);
    }
  };

  return (
    <div>
      <MenuButton onClick={() => toggleMenu()}>
        <UserIcon />
      </MenuButton>
      <CSSTransition
        in={open}
        timeout={300}
        unmountOnExit
        classNames='usermenu'
      >
        <Menu username={username} />
      </CSSTransition>
    </div>
  );
};

export default UserMenu;