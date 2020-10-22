import React from 'react';
import { CSSTransition } from 'react-transition-group';
import * as Styled from './style';

interface BaseDialogProps {
  open?: boolean;
  children: JSX.Element;
}

const BaseDialog: React.FC<BaseDialogProps> = ({ open, children }) => {
  return (
    <>
      <CSSTransition in={open} timeout={300} mountOnEnter unmountOnExit classNames="backdrop">
        <Styled.BackDrop />
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames="dialog"
        data-testid="transition-dialog"
      >
        <Styled.FloatingDialogContainer data-testid="floating-dialog">
          {children}
        </Styled.FloatingDialogContainer>
      </CSSTransition>
    </>
  );
};

export default BaseDialog;
