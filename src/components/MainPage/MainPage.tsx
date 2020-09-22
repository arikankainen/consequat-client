import React from 'react';
import logo from '../../images/consequat.png';
import { Container, Image } from './style';

const MainPage = () => {
  return (
    <Container>
      <Image src={logo} alt="Consequat" />
    </Container>
  );
};

export default MainPage;
