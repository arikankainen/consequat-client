import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuItems } from '../MenuItems/MenuItems';
import * as Styled from './style';

export enum Direction {
  Left,
  Right,
}

interface Button {
  text: string;
  Icon: React.FunctionComponent;
  iconColor?: string;
  iconColorHover?: string;
}

interface Item {
  text: string;
  subText?: string;
  link: string;
  Icon?: React.FunctionComponent;
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
  const [open, setOpen] = useState(false);
  const refButton = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((event: MouseEvent) => {
    if (event.target && event.target instanceof HTMLElement) {
      if (refButton.current && refButton.current.contains(event.target)) return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [closeMenu]);

  return (
    <Styled.MenuButtonContainer hideWhen={settings.hideWhen}>
      <Styled.MenuButton
        ref={refButton}
        onClick={() => setOpen(!open)}
        iconColor={button.iconColor}
        iconColorHover={button.iconColorHover}
      >
        <button.Icon />
      </Styled.MenuButton>
      <CSSTransition
        in={open}
        timeout={300}
        unmountOnExit
        classNames={settings.classNames}
      >
        <MenuItems button={button} items={items} settings={settings} />
      </CSSTransition>
    </Styled.MenuButtonContainer>
  );
};

export default Menu;
