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
    filter: drop-shadow(1px 1px 0px rgba(0, 0, 0, .5));
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
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 0px 30px;
  line-height: 1;
`;

export const H2 = styled.h1`
  font-family: var(--topic-font-family);
  font-weight: 400;
  font-size: 24px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 0px 30px;
`;

export const H3 = styled.h1`
  font-family: var(--topic-font-family);
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 0px 30px;
`;

export const StyledLink = styled(Link)`
  font-family: var(--topic-font-family);
  font-weight: 900;
  letter-spacing: 1px;
  text-decoration: none;

  &:link,
  &:visited {
    color: #fff;
  }

  &:hover {
    color: var(--accent-color-2-hover);
  }
  
`;