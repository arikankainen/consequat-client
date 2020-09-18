import styled, { css } from 'styled-components';

interface SpinnerProps {
  show?: boolean;
  size?: number;
}

const Spinner = styled.div<SpinnerProps>`
  border-radius: 50%;
  background: var(--accent-color-2);
  background: linear-gradient(to right, var(--accent-color-2) 10%, rgba(31,100,203, 0) 42%);
  position: relative;
  animation: spin 1s infinite linear;
  transform: translateZ(0);

  opacity: 0;
  width: 30px;
  height: 30px;

  ${props =>
    props.show &&
    css`
      opacity: 1;
  `}

  ${props =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
  `}

  &:before {
    width: 50%;
    height: 50%;
    background: var(--accent-color-2);
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
