import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

interface ContainerProps {
  disabled: boolean;
}

export const Container = styled(Link)<ContainerProps>`
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
    props.disabled &&
    css`
      pointer-events: none;
  `}
`;
