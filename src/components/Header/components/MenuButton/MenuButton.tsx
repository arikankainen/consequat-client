import React from 'react';
import * as Styled from './style';
import Spinner from 'components/Spinner/Spinner';

interface MenuButtonProps {
  to: string;
  text: string;
  Icon: React.FunctionComponent;
  loading: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = props => {
  const customizedSpinner = (
    <Spinner size={20} show={true} color="0, 122, 217" bgcolor="17, 17, 17" />
  );

  return (
    <Styled.Container to={props.to} disabled={props.loading}>
      {props.loading ? customizedSpinner : <props.Icon />}
    </Styled.Container>
  );
};

export default MenuButton;
