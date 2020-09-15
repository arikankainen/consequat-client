import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuItems } from './MenuItems';
import { MenuButton, MenuButtonContainer } from './style';

export enum Direction {
  Left,
  Right,
}

interface Button {
  text: string;
  icon: React.FunctionComponent;
  iconColor?: string;
  iconColorHover?: string;
}

interface Item {
  text: string;
  subText?: string;
  link: string;
  icon?: React.FunctionComponent;
}

interface Settings {
  classNames: string;
  direction: Direction;
  hideWhen?: number;
}

export interface MenuProps {
  button: Button;
  items: Item[];
  settings: Settings;
}

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
    <MenuButtonContainer hideWhen={settings.hideWhen}>
      <MenuButton
        onClick={() => toggleMenu()}
        iconColor={button.iconColor}
        iconColorHover={button.iconColorHover}
      >
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
    </MenuButtonContainer>
  );
};

export default Menu;
