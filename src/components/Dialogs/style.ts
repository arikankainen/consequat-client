import styled, { css } from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const BackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1002;
`;

export const FloatingDialogContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1003;
`;

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  width: 90%;
  max-width: 500px;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 5px;

  ${breakPoints.mobileXL} {
    width: 100%;
    margin: 0px;
    border-radius: 0;
  }
`;

export const DialogTopic = styled.div`
  padding: 25px 20px 10px 20px;
  color: #111;
  line-height: 1;
  text-align: left;
  font-size: 24px;
  font-weight: 300;
  background-color: #fff;
  border-radius: 5px 5px 0px 0px;
`;

export const DialogContent = styled.div`
  background-color: #fff;
  overflow: auto;
`;

export const Warning = styled.div`
  margin: 10px 20px 20px 20px;
  color: #000;
  font-size: 14px;
  line-height: 1.2;
`;

export const DialogButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 5px 10px;
  background-color: #fff;
  border-radius: 0px 0px 5px 5px;
`;

export const Text = styled.div`
  padding: 20px 20px 10px 20px;
  color: #000;
  line-height: 1;
`;

export const ProgressContainer = styled.div`
  height: 20px;
  margin: 0px 15px 0px 15px;
  background-color: #ddd;
`;

interface ProgressProps {
  progress: number;
}

export const Progress = styled.div<ProgressProps>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #55bb55;
`;

export const SavingIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3px;
  padding-left: 10px;
  padding-right: 15px;
  width: 100%;
  color: var(--accent-color-2);
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  text-align: left;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 0px 5px;
`;

export const Label = styled.label`
  display: block;
  margin-top: 8px;
  margin-right: 10px;
  width: 100px;
  color: #000;
  font-size: 14px;
  line-height: 1;
  text-align: right;
  font-weight: 400;
`;

export const DummyInput = styled.div`
  background-color: #fff;
  width: 100%;
  color: #000;
  font-size: 14px;
  padding: 8px 7px 7px 7px;
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
  padding-top: 6px;
  margin-left: 10px;
  cursor: pointer;

  & > svg {
    color: var(--unlocked-color);
    height: 16px;
  }

  ${props =>
    props.locked &&
    css`
      & > svg {
        color: var(--locked-color);
        height: 16px;
      }
  `}
`;
