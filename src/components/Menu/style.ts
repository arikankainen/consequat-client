import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Direction } from './Menu';
import breakPoints from '../../utils/breakPoints';

interface MenuItemsContainerProps {
  direction: Direction;
}

export const MenuItemsContainer = styled.ul<MenuItemsContainerProps>`
  position: absolute;
  width: 300px;
  padding: 0px 0px;
  background-color: #fff;
  box-shadow: var(--default-box-shadow);

  ${props =>
    props.direction === Direction.Right &&
    css`
      right: -10px;
  `}

  ${props =>
    props.direction === Direction.Left &&
    css`
      left: -10px;
  `}

  top: 50px;

  ${breakPoints.mobileL} {
    width: 100vw;
  }
`;

interface MenuButtonContainerProps {
  hideWhen?: number;
}

export const MenuButtonContainer = styled.div<MenuButtonContainerProps>`
  position: relative;

  ${props =>
    props.hideWhen &&
    css`
      @media screen and (min-width: ${props.hideWhen}px) {
        display: none;
      }
  `}
`;

export const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-size);
  min-width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--navigation-bg-color-hover);

    & > svg {
      color: var(--icon-color-hover);
    }
  }

  & > svg {
    height: var(--icon-size);
    color: var(--icon-color);
  }
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid #eee;
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 7px 20px;
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
    background-color: rgba(0, 122, 217, .07);
    background-color: rgba(10, 10, 0, .05);

    & > svg {
      color: var(--accent-color-2-hover);
    }
  }

  & > svg {
    height: var(--icon-size);
    margin-right: 15px;
    color: var(--icon-color);
  }

  transition: all 200ms ease;
`;

export const MenuTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const MenuTextUpperText = styled.div`
  font-size: var(--default-font-size-bigger);
  color: #000;
  line-height: 1.2;
`;

export const MenuTextLowerText = styled.div`
  font-size: 15px;
  color: #777;
  line-height: 1.2;
`;
