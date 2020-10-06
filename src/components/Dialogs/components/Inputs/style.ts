import styled, { css } from 'styled-components/macro';

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 8px;
  color: #000;
  font-size: 14px;
  line-height: 1;
  text-align: right;
  font-weight: 400;
`;

export const CheckboxLabel = styled(Label)`
  & > input[type='checkbox'] {
    display: none;
  }

  & > input[type='checkbox'] + *::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background-color: transparent;
    border: 1px solid #ccc;
    margin-right: 7px;
    line-height: 1.6;
    font-size: 14px;
    font-weight: 500;
  }

  & > input[type='checkbox']:checked + *::before {
    content: '✓';
    background-color: var(--accent-color-2);
    border: 1px solid var(--accent-color-2);
    color: #fff;
    text-align: center;
  }

  & > input[type='checkbox']:disabled:checked + *::before {
    content: '✓';
    background-color: #ccc;
    border: 1px solid #ccc;
    color: #fff;
    text-align: center;
  }

  & > input[type='checkbox']:disabled + * {
    color: #999;
  }

  & > span {
    font-weight: 400;
    color: #000;
  }
`;

export const DummyLabel = styled(Label)`
  padding-top: 0px;
`;

export const DummyInput = styled.div`
  background-color: #fff;
  width: 100%;
  color: #000;
  font-size: 14px;
  line-height: 1;
`;

interface InputProps {
  error?: boolean;
}

export const Input = styled.input<InputProps>`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  color: #000;
  font-size: 14px;
  padding: 2px 6px 2px 6px;
  line-height: 1;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid var(--error-color);
  `}

  &:disabled {
    background-color: #eeeeef;
    color: #000;
  }
`;

export const Select = styled.select`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  color: #111;
  font-size: 14px;
  padding: 1px 2px 2px 2px;
  line-height: 1;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }

  &:disabled {
    background-color: #eeeeef;
    color: #000;
  }
`;

export const TextArea = styled.textarea`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  min-height: 50px;
  color: #111;
  font-size: 14px;
  padding: 6px 6px;
  line-height: 1.2;
  resize: vertical;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }

  &:disabled {
    background-color: #eeeeef;
    color: #000;
  }
`;

interface ErrorProps {
  error: boolean;
}

export const Error = styled.div<ErrorProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  color: var(--error-color);
  line-height: 1;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;

  margin-top: 0;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.1s ease, opacity 0.3s ease, margin 0.1s ease;

  ${props =>
    props.error &&
    css`
      margin-top: 7px;
      max-height: 20px;
      opacity: 1;
  `};
`;

interface LockContainerProps {
  locked?: boolean;
}

export const LockContainer = styled.div<LockContainerProps>`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 6px;
  margin-left: 10px;
  cursor: pointer;

  & > svg {
    color: var(--unlocked-color);
    height: 16px;
    width: 16px;
  }

  ${props =>
    props.locked &&
    css`
      & > svg {
        color: var(--locked-color);
      }
  `}
`;

export const Separator = styled.div`
  grid-column: span 2;
`;
