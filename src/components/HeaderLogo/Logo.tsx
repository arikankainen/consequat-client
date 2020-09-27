import React from 'react';
import logoImage from '../../images/consequat_top2.png';
import * as Styled from './style';

const Logo = () => {
  return (
    <Styled.LogoLink to="/">
      <Styled.LogoImage>
        <img src={logoImage} alt="consequat-logo" />
      </Styled.LogoImage>
    </Styled.LogoLink>
  );
};

export default Logo;
