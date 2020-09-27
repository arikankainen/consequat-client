import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Direction } from '../Menu/Menu';

interface MenuItemsContainerProps {
  direction: Direction;
}

export const MenuItemsContainer = styled.ul<MenuItemsContainerProps>`
  position: absolute;
  width: 250px;
  padding: 0px 0px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: var(--menu-box-shadow);

  ${props =>
    props.direction === Direction.Right &&
    css`
      right: 0px;
  `}

  ${props =>
    props.direction === Direction.Left &&
    css`
      left: 0px;
  `}

  top: 60px;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid #eee;

  &:first-child > a {
    border-radius: 6px 6px 0px 0px;
    padding-top: 10px;
  }

  &:last-child > a {
    border-radius: 0px 0px 6px 6px;
    padding-bottom: 10px;
  }

  &:last-child {
    border: none;
  }
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
    background-color: rgba(10, 10, 0, .03);

    & > svg {
      color: var(--accent-color-2-hover);
    }
  }

  & > svg {
    height: var(--icon-size);
    width: var(--icon-size);
    margin-right: 15px;
    color: var(--icon-color);
    color: #555;
  }

  transition: all 100ms ease-in-out;
`;

export const MenuTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const MenuTextUpperText = styled.div`
  font-family: var(--topic-font-family);
  font-size: 16px;
  font-weight: 200;
  color: #000;
  line-height: 1.2;
`;

export const MenuTextLowerText = styled.div`
  font-size: 14px;
  color: #444;
  line-height: 1.2;
  padding-top: 5px;
`;
