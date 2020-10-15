import React from 'react';
import logoImage from 'images/consequat_top2.png';
import * as Styled from './style';

interface LogoProps {
  link: string;
}

const Logo: React.FC<LogoProps> = ({ link }) => {
  return (
    <Styled.LogoLink to={link}>
      <Styled.LogoImage>
        <img src={logoImage} alt="consequat-logo" />
      </Styled.LogoImage>
    </Styled.LogoLink>
  );
};

export default Logo;
