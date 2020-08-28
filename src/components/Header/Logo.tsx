import React from 'react';
import styled from 'styled-components';
import logoImage from '../../images/consequat_top2.png';
import logoImageSmall from '../../images/consequat_o.png';
import { Link } from 'react-router-dom';

const LogoLink = styled(Link)`
  height: 30px;
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
        <source media="(max-width: 500px)" srcSet={logoImageSmall} />
        <source media="(min-width: 501px)" srcSet={logoImage} />
        <img src={logoImage} alt="consequat-logo" />
      </LogoImage>
    </LogoLink>
  );
};

export default Logo;
