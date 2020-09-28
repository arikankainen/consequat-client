import styled, { css } from 'styled-components/macro';

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

interface MenuButtonProps {
  iconColor?: string;
  iconColorHover?: string;
}

export const MenuButton = styled.div<MenuButtonProps>`
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

  ${props =>
    props.iconColor &&
    css`
      & > svg {
        color: ${props.iconColor};
      }
  `}

  ${props =>
    props.iconColorHover &&
    css`
      &:hover {
        & > svg {
          color: ${props.iconColorHover};
        }
      }
  `}
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
