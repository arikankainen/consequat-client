import styled, { css } from 'styled-components/macro';

interface LabelProps {
  focus?: boolean;
}

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  display: block;
  width: 100%;
  color: #666;
  color: var(--accent-color-2);
  font-size: 15px;
  text-align: left;
  font-weight: 500;
  line-height: 1;
  pointer-events: none;
  transition: .2s;
  z-index: 1;

  ${props =>
    props.focus &&
    css`
      font-size: 13px;
      top: 12px;
  `}
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;

  & > svg {
    height: 20px;
    width: 24px;
    color: #555;
  }
`;

interface InputContainerProps {
  focused?: boolean;
  error?: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: var(--input-border-radius);
  cursor: text;

  ${props =>
    props.error &&
    css`
      box-shadow: 0px 0px 1px 1px var(--error-color);
  `};

  ${props =>
    props.focused &&
    css`
      box-shadow: var(--focus);
  `};
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 25px;
  margin-top: 12px;
  padding-top: 5px;
  background-color: #fff;
  border: none;
  color: #222;
  font-size: 16px;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;

interface ErrorProps {
  error: boolean;
}

export const Error = styled.div<ErrorProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 7px;
  margin-left: 5px;
  color: var(--error-color);
  line-height: 1;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  transition: max-height 0.1s ease, opacity 0.3s ease;

  max-height: 0;
  opacity: 0;

  ${props =>
    props.error &&
    css`
    max-height: 20px;
    margin-bottom: 15px;
    opacity: 1;
  `};

  & > svg {
    margin-bottom: 2px;
    margin-right: 5px;
    height: 16px;
    color: var(--error-color);
  }
`;
