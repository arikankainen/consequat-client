import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: var(--navigation-bg-color);
  padding-left: 20px;
  padding-right: 20px;
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: var(--default-font-color);

  &:visited {
    color: var(--default-font-color);
  }
  &:hover {
    color: var(--default-font-color-highlight);
  }
`;

export const LogoImage = styled.img`
  height: 30px;
  margin-top: 6px;
`;

export const UserImage = styled.img`
  height: 20px;
`;

export const UserName = styled.div`
  margin-right: 10px;
  color: var(--accent-color-2);
`;

export const UserMenuButton = styled(Link)`
  display: flex;
  align-items: center;

  margin-right: -10px;
  padding: 5px 15px;
  text-decoration: none;
  border-radius: var(--input-border-radius);
  
  &:hover {
    background-color: var(--navigation-bg-color-hover);
  }
`;
