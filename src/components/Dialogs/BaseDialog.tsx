import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { BackDrop, FloatingDialogContainer } from './style';

interface BaseDialogProps {
  open?: boolean;
  children: JSX.Element;
}

const BaseDialog: React.FC<BaseDialogProps> = ({ open, children }) => {
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
        <FloatingDialogContainer>{children}</FloatingDialogContainer>
      </CSSTransition>
    </>
  );
};

export default BaseDialog;
