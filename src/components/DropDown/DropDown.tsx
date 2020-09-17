import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as ExpandIcon } from '../../images/expand.svg';
import Content from './Content';

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
  const refButton = useRef<HTMLButtonElement>(null);
  const refMenu = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((event: MouseEvent) => {
    if (event.target && event.target instanceof HTMLElement) {
      if (refMenu.current && refMenu.current.contains(event.target)) return;
      if (refButton.current && refButton.current.contains(event.target)) return;
    }

    setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [closeMenu]);

  return (
    <Container>
      <Button
        refProp={refButton}
        text="Search options"
        onClick={() => setOpen(!open)}
        margin={[0, 0, 0, 0]}
        icon={ExpandIcon}
        color={ButtonColor.white}
        rounded
      />
      <Drop show={open} ref={refMenu}>
        <Content open={open} />
      </Drop>
    </Container>
  );
};

export default DropDown;
