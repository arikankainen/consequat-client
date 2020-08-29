import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-size);
  min-width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--navigation-bg-color-hover);

    & > svg {
      color: var(--icon-color-hover);
    }
  }

  & > svg {
    height: var(--icon-size);
    color: var(--icon-color);
  }
`;

interface MenuButtonProps {
  to: string;
  text: string;
  icon: React.FunctionComponent;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <Container to={props.to}>
      <props.icon />
    </Container>
  );
};

export default MenuButton;
