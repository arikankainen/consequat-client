import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--navigation-bg-color);
  padding-left: 20px;
  padding-right: 10px;
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: var(--accent-color-2);
  padding-right: 10px;
  padding-left: 10px;
  font-weight: 600;
  white-space: nowrap;

  &:visited {
    color: var(--accent-color-2);
  }
  &:hover {
    color: var(--accent-color-2-hover);
  }
`;

export const LogoLink = styled(Link)`
  height: 30px;
`;

export const LogoImage = styled.picture`
  height: 30px;

  &:hover {
    filter: brightness(1.2);
  }

  & > img {
    height: 30px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 3;
  width: 400px;
  margin-left: 20px;
  margin-right: 10px;
  padding-left: 15px;
  height: var(--button-size);
  border-radius: var(--input-border-radius);
  background-color: var(--bg-color);

  & > svg {
    height: var(--icon-size);
    color: var(--icon-color);
  }
`;

export const Input = styled.input`
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: var(--bg-color);
  border: none;
  color: var(--default-font-color);

  &:focus {
    outline-width: 0;
  }
`;