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
  background-color: var(--navigation-bg-color);

  ${(props) =>
    props.direction === Direction.Right &&
    css`
      right: -10px;
  `}

  ${(props) =>
    props.direction === Direction.Left &&
    css`
      left: -10px;
  `}

  top: 50px;

  ${breakPoints.mobileL} {
    width: 100vw;
  }
`;

export const MenuButtonContainer = styled.div`
  position: relative;
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
  border-top: 1px solid #111;
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
  }

  & > svg {
    height: var(--icon-size);
    margin-right: 15px;
    color: var(--icon-color);
  }

  transition: all 200ms linear;
`;

export const MenuTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const MenuTextUpperText = styled.div`
  font-size: var(--default-font-size-bigger);
  color: #ddd;
  line-height: 1.2;
`;

export const MenuTextLowerText = styled.div`
  font-size: var(--default-font-size);
  color: #aaa;
  line-height: 1.2;
`;
