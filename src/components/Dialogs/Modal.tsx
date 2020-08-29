import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { BackDrop, FloatingContainer } from './styles';

interface Props {
  open?: boolean;
  children: JSX.Element;
}

const Modal: React.FC<Props> = ({ open, children }) => {
  return (
    <>
      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames="backdrop"
      >
        <BackDrop />
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames="dialog"
      >
        <FloatingContainer>{children}</FloatingContainer>
      </CSSTransition>
    </>
  );
};

export default Modal;
