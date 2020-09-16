import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as ExpandIcon } from '../../images/expand.svg';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

interface DropProps {
  show: boolean;
}

const Drop = styled.div<DropProps>`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 200px;
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  box-shadow: var(--menu-box-shadow);
  border-radius: 5px;
  opacity: 0;
  /*transition: opacity 150ms ease-in-out;*/

  ${props =>
    props.show &&
    css`
      opacity: 1;

  `}
`;

const DropDown = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    document.removeEventListener('click', closeMenu);
    setOpen(false);
  };

  const toggleMenu = () => {
    if (!open) {
      document.addEventListener('click', closeMenu);
      setOpen(true);
    } else {
      document.removeEventListener('click', closeMenu);
      setOpen(false);
    }
  };

  return (
    <Container>
      <Button
        text="Search options"
        onClick={toggleMenu}
        margin={[0, 0, 0, 0]}
        icon={ExpandIcon}
        color={ButtonColor.white}
        rounded
      />
      <Drop show={open}>
        Search options
        <br />
      </Drop>
    </Container>
  );
};

export default DropDown;
