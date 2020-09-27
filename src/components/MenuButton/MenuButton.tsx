import React from 'react';
import * as Styled from './style';

interface MenuButtonProps {
  to: string;
  text: string;
  Icon: React.FunctionComponent;
}

const MenuButton: React.FC<MenuButtonProps> = props => {
  return (
    <Styled.Container to={props.to}>
      <props.Icon />
    </Styled.Container>
  );
};

export default MenuButton;
