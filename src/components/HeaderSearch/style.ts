import styled, { css } from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';

interface SearchContainerProps {
  focus: boolean;
}
export const SearchContainer = styled.div<SearchContainerProps>`
  display: flex;
  flex: 100;
  align-items: center;
  justify-content: flex-start;
  max-width: 300px;
  /* max-width: 45px; */
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 15px;
  height: 34px;
  border-radius: var(--input-border-radius);
  background-color: var(--input-bg-color);
  cursor: text;
  transition: all 200ms ease-in-out;

  & > form {
    width: 100%;
  }

  & > svg {
    width: 16px;
    min-width: 16px;
    color: var(--icon-color);
    color: #aaa;
  }

  ${props =>
    props.focus &&
    css`
      background-color: #444;
      max-width: 400px;
  `}

  ${breakPoints.custom(600)} {
    max-width: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  /* margin-left: 20px;
  margin-right: 20px; */
  padding-left: 15px;
  padding-right: 5px;
  background-color: transparent;
  border: none;
  color: var(--input-color);
  font-size: var(--default-font-size);
  padding-top: 1px;
  line-height: 1;

  &:focus {
    outline-width: 0;
  }
`;
