import React from 'react';
import styled from 'styled-components';
import logoImage from '../images/consequat_top.png';

const Img = styled.img`
  height: 30px;
`;

const Component = () => {
  return (
    <Img src={logoImage} />
  );
};

export default Component;