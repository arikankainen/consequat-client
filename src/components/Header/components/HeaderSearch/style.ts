import styled, { css } from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

interface SearchContainerProps {
  focus: boolean;
  useInPage?: boolean;
}

export const SearchContainer = styled.div<SearchContainerProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  border-radius: var(--input-border-radius);
  cursor: text;
  transition: all 200ms ease-in-out;

  & > form {
    width: 100%;
  }

  & > svg {
    width: 16px;
    min-width: 16px;
    color: var(--icon-color);
    color: #999;
  }

  ${props =>
    !props.useInPage &&
    css`
      height: 34px;
      width: 100%;
      max-width: 300px;
      margin-left: 10px;
      margin-right: 10px;
      background-color: var(--input-bg-color);
      
      ${breakPoints.custom(600)} {
        max-width: 100%;
      }
  `}

  ${props =>
    !props.useInPage &&
    props.focus &&
    css`
      background-color: #444;
      max-width: 400px;
  `}

  ${props =>
    props.useInPage &&
    css`
      height: 45px;
      min-height: 45px;
      width: 100%;
      background-color: #eee;
  `}

  ${props =>
    props.useInPage &&
    props.focus &&
    css`
      background-color: #e5e5e5;
  `}
`;

interface InputProps {
  useInPage?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding-left: 15px;
  padding-right: 5px;
  background-color: transparent;
  border: none;
  font-size: var(--default-font-size);
  padding-top: 1px;
  line-height: 1;

  &:focus {
    outline-width: 0;
  }

  ${props =>
    !props.useInPage &&
    css`
      color: var(--input-color);
  `}

  ${props =>
    props.useInPage &&
    css`
      color: #000;
  `}
`;
