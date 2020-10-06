import React from 'react';
import { ReactComponent as MenuIcon } from 'images/consequat_o.svg';
import Button from 'components/Button/Button';
import { ButtonColor } from 'components/Button/style';
import { useHistory } from 'react-router-dom';
import * as Styled from './style';

const Main = () => {
  const history = useHistory();

  return (
    <Styled.Container>
      <Styled.Logo>
        <MenuIcon />
      </Styled.Logo>
      <Styled.BigText>Join the world of Consequat</Styled.BigText>
      <Styled.MediumText>
        and get started to share your photos!
      </Styled.MediumText>
      <Button
        text="Sign up"
        color={ButtonColor.whiteBig}
        onClick={() => history.push('/signup')}
        margin={[30, 0, 10, 0]}
      />
      <Styled.LoginText>
        <Styled.Link to="/login">Log in</Styled.Link>
      </Styled.LoginText>
      <Styled.SmallText>
        Please check out <Styled.Link to="/about">About</Styled.Link> page, to
        see what this all is about!
      </Styled.SmallText>
    </Styled.Container>
  );
};

export default Main;
