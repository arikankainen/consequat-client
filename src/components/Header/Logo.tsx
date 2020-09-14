import React from 'react';
import styled from 'styled-components';
import logoImage from '../../images/consequat_top2.png';
import { Link } from 'react-router-dom';
import breakPoints from '../../utils/breakPoints';

const LogoLink = styled(Link)`
  height: 30px;

  ${breakPoints.custom(600)} {
    display: none;
  }
`;

const LogoImage = styled.picture`
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    filter: brightness(1.2);
  }

  & > img {
    height: 30px;
  }
`;

const Logo = () => {
  return (
    <LogoLink to="/">
      <LogoImage>
        <img src={logoImage} alt="consequat-logo" />
      </LogoImage>
    </LogoLink>
  );
};

export default Logo;
