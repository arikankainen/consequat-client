import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: var(--navigation-bg-color);
`;

export const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding-left: 10px;
  padding-right: 10px;
  min-height: var(--header-height);
  max-width: ${breakPoints.laptopLWidth};
  width: 100%;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1 1 0%;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 1 0%;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0px 15px;
  font-family: var(--topic-font-family);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:link, &:visited {
    color: #ddd;
  }

  &:hover {
    color: #fff;
  }

  ${breakPoints.custom(600)} {
    display: none;
  }
`;
