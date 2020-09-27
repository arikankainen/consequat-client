import React from 'react';
import { Container, Logo, H1, H2, H3, StyledLink } from './style';
import { ReactComponent as MenuIcon } from '../../images/consequat_o.svg';
import Button from '../../components/Buttons/Button';
import { ButtonColor } from '../../components/Buttons/style';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();

  return (
    <Container>
      <Logo>
        <MenuIcon />
      </Logo>

      <H1>Join the world of Consequat</H1>
      <H2>and get started to share your photos!</H2>

      <Button
        text="Join now"
        color={ButtonColor.whiteBig}
        onClick={() => history.push('/signup')}
        margin={[30, 0, 30, 0]}
      />

      <H3>
        Please check out <StyledLink to="/about">About</StyledLink> page, to see
        what this all is about!
      </H3>
    </Container>
  );
};

export default Main;
