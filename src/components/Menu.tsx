import React, { useState } from 'react';
import { MenuButton } from './Header/Styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const MenuContainer = styled.ul`
  position: absolute;
  top: 61px;
  right: 1px;
  padding: 0px 0px;
  background-color: var(--navigation-bg-color);
`;

const MenuItem = styled.li`
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

interface Button {
  text: string;
  icon: React.FunctionComponent;
}

interface Item {
  text: string;
  subText: string | undefined;
  link: string;
  icon: React.FunctionComponent;
}

export enum Direction {
  Left,
  Right,
}

interface Settings {
  classNames: string;
  top: number;
  direction: Direction;
}

interface MenuProps {
  button: Button;
  items: Item[];
  settings: Settings;
}

const MenuItems: React.FC<MenuProps> = ({ items }) => {
  return (
    <MenuContainer>

      {items.map(item => {
        return (
          <MenuItem key={item.text}>
            <MenuLink to={item.link}>
              <item.icon />
              <MenuTextContainer>
                <MenuTextUpperText>{item.text}</MenuTextUpperText>
                <MenuTextLowerText>{item.subText}</MenuTextLowerText>
              </MenuTextContainer>
            </MenuLink>
          </MenuItem>
        );
      })}

    </MenuContainer>
  );
};

const Menu: React.FC<MenuProps> = ({ button, items, settings }) => {
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
        <button.icon />
      </MenuButton>
      <CSSTransition
        in={open}
        timeout={300}
        unmountOnExit
        classNames={settings.classNames}
      >
        <MenuItems button={button} items={items} settings={settings} />
      </CSSTransition>
    </div>
  );
};

export default Menu;