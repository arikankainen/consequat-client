import React from 'react';
import { MenuProps } from './Menu';

import {
  MenuItemsContainer,
  MenuItem,
  MenuLink,
  MenuTextContainer,
  MenuTextUpperText,
  MenuTextLowerText,
} from './style';

export const MenuItems: React.FC<MenuProps> = ({ items, settings }) => {
  return (
    <MenuItemsContainer direction={settings.direction}>
      {items.map((item) => {
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
    </MenuItemsContainer>
  );
};
