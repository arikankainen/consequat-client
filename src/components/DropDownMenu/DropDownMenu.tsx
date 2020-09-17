import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as ExpandIcon } from '../../images/expand.svg';

const Container = styled.div`
  display: flex;
  position: relative;
`;

export enum DropDownAlign {
  left,
  right,
}

interface DropProps {
  show: boolean;
  alignContent: DropDownAlign;
}

const Drop = styled.div<DropProps>`
  position: absolute;
  top: calc(100% + 10px);
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  box-shadow: var(--menu-box-shadow);
  border-radius: 5px;
  display: none;

  ${props =>
    props.show &&
    css`
      display: block;
  `}

  ${props =>
    props.alignContent === DropDownAlign.left &&
    css`
      left: 0;
  `}

  ${props =>
    props.alignContent === DropDownAlign.right &&
    css`
      right: 0;
  `}
`;

interface DropDownMenuProps {
  buttonName: string;
  children: JSX.Element;
  alignContent: DropDownAlign;
  Icon?: React.FunctionComponent;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  children,
  buttonName,
  alignContent,
  Icon,
}) => {
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
        text={buttonName}
        onClick={() => setOpen(!open)}
        margin={[0, 0, 0, 0]}
        icon={Icon || ExpandIcon}
        color={ButtonColor.white}
        rounded={true}
      />
      <Drop show={open} ref={refMenu} alignContent={alignContent}>
        {React.cloneElement(children, {
          open: open,
          onSubmitted: () => setOpen(false),
        })}
      </Drop>
    </Container>
  );
};

export default DropDownMenu;
