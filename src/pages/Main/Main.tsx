import React from 'react';
import * as Styled from './style';
import { ReactComponent as MenuIcon } from '../../images/consequat_o.svg';
import Button from '../../components/Button/Button';
import { ButtonColor } from '../../components/Button/style';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();

  return (
    <Styled.Container>
      <Styled.Logo>
        <MenuIcon />
      </Styled.Logo>

      <Styled.H1>Join the world of Consequat</Styled.H1>
      <Styled.H2>and get started to share your photos!</Styled.H2>

      <Button
        text="Join now"
        color={ButtonColor.whiteBig}
        onClick={() => history.push('/signup')}
        margin={[30, 0, 30, 0]}
      />

      <Styled.H3>
        Please check out <Styled.MainLink to="/about">About</Styled.MainLink>{' '}
        page, to see what this all is about!
      </Styled.H3>
    </Styled.Container>
  );
};

export default Main;
