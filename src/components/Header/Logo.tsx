import React from 'react';
import logoImage from '../../images/consequat_top.png';
import { Link } from 'react-router-dom';
import { LogoImage } from './Styles';

const Logo = () => {
  return (
    <Link to='/'>
      <LogoImage src={logoImage} />
    </Link>
  );
};

export default Logo;