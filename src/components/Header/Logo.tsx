import React from 'react';
import logoImage from '../../images/consequat_top2.png';
import logoImageSmall from '../../images/consequat_o.png';
import { LogoImage, LogoLink } from './Styles';

const Logo = () => {
  return (
    <LogoLink to='/'>
      <LogoImage>
        <source media='(max-width: 500px)' srcSet={logoImageSmall} />
        <source media='(min-width: 501px)' srcSet={logoImage} />
        <img src={logoImage} />
      </LogoImage>
    </LogoLink>
  );
};

export default Logo;