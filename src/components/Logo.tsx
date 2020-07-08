import React from 'react';
import styled from 'styled-components';
import logoImage from '../images/consequat_top.png';
import { Link } from 'react-router-dom';

const Img = styled.img`
  height: 30px;
`;

const Component = () => {
  return (
    <Link to='/'>
      <Img src={logoImage} />
    </Link>
  );
};

export default Component;