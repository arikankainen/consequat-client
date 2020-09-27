import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export enum DropDownAlign {
  left,
  right,
}

interface DropProps {
  show: boolean;
  alignContent: DropDownAlign;
}

export const Drop = styled.div<DropProps>`
  position: absolute;
  top: calc(100% + 10px);
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  box-shadow: var(--menu-box-shadow);
  border-radius: 5px;
  display: none;

  ${props =>
    props.show &&
    css`
      display: block;
  `}

  ${props =>
    props.alignContent === DropDownAlign.left &&
    css`
      left: 0;
  `}

  ${props =>
    props.alignContent === DropDownAlign.right &&
    css`
      right: 0;
  `}
`;
