import React, { useEffect, useRef, useState, useCallback } from 'react';
import Button from '../Button/Button';
import { ButtonColor } from '../Button/style';
import { ReactComponent as ExpandIcon } from '../../images/chevron-down-solid_modified.svg';
import * as Styled from './style';

interface DropDownMenuProps {
  buttonName: string;
  children: JSX.Element;
  alignContent: Styled.DropDownAlign;
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
    <Styled.Container>
      <Button
        refProp={refButton}
        text={buttonName}
        onClick={() => setOpen(!open)}
        margin={[0, 0, 0, 0]}
        icon={Icon || ExpandIcon}
        color={ButtonColor.white}
        rounded={true}
      />
      <Styled.Drop show={open} ref={refMenu} alignContent={alignContent}>
        {React.cloneElement(children, {
          open: open,
          onSubmitted: () => setOpen(false),
        })}
      </Styled.Drop>
    </Styled.Container>
  );
};

export default DropDownMenu;
