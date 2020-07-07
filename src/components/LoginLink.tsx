import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--default-font-color);
  &:visited {
    color: var(--default-font-color);
  }
  &:hover {
    color: var(--default-font-color-highlight);
  }
`;

const LoginLink = () => {
  return (
    <div>
      <StyledLink to='/login'>Login</StyledLink>
    </div>
  );
};

export default LoginLink;