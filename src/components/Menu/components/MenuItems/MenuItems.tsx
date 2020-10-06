import React from 'react';
import { MenuProps } from '../../Menu';
import * as Styled from './style';

export const MenuItems: React.FC<MenuProps> = ({ items, settings }) => {
  return (
    <Styled.MenuItemsContainer direction={settings.direction}>
      {items.map(item => {
        return (
          <Styled.MenuItem key={item.text}>
            <Styled.MenuLink to={item.link}>
              {item.Icon && <item.Icon />}
              <Styled.MenuTextContainer>
                <Styled.MenuTextUpperText>{item.text}</Styled.MenuTextUpperText>
                {item.subText && (
                  <Styled.MenuTextLowerText>
                    {item.subText}
                  </Styled.MenuTextLowerText>
                )}
              </Styled.MenuTextContainer>
            </Styled.MenuLink>
          </Styled.MenuItem>
        );
      })}
    </Styled.MenuItemsContainer>
  );
};
