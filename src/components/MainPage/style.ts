import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px 0px;
  max-width: ${breakPoints.laptopLWidth};
`;

export const Logo = styled.div`
  margin-bottom: 20px;

  & > svg {
    width: 150px;
    height: 150px;
    color: var(--accent-color-1);
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, .8));
    animation: spin 30s infinite linear;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  ${breakPoints.mobileM} {
    margin-bottom: 10px;

    & > svg {
      width: 100px;
      height: 100px;
    }
  }
`;

export const H1 = styled.h1`
  font-family: var(--topic-font-family);
  font-weight: 400;
  font-size: 36px;
  color: #fff;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1);
  text-align: center;
  padding: 0px 30px;
  line-height: 1;
`;

export const H2 = styled.h1`
  font-family: var(--topic-font-family);
  font-weight: 400;
  font-size: 24px;
  color: #fff;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
  text-align: center;
  padding: 0px 30px;
`;

export const H3 = styled.h1`
  font-family: var(--topic-font-family);
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
  text-align: center;
  padding: 0px 30px;
`;

export const StyledLink = styled(Link)`
  font-family: var(--topic-font-family);
  font-weight: 800;
  text-decoration: none;

  &:link,
  &:visited {
    color: #fff;
  }

  &:hover {
    color: var(--accent-color-2-hover);
  }
  
`;
