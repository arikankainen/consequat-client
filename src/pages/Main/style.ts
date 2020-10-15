import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';
import { Link } from 'react-router-dom';

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #212123;
`;

export const ConsequatImage = styled.img`
  width: 100%;
  max-width: 750px;
  margin: 50px 0px;

  ${breakPoints.custom(900)} {
    width: 80vw;
    margin: 5vw 0px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 40px;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  
  ${breakPoints.mobileXL} {
    justify-content: flex-start;
    padding: 20px 20px;
  }
`;

export const H1 = styled.h1`
  margin-top: 40px;
  margin-bottom: 10px;
  font-family: var(--topic-font-family);
  font-size: 36px;
  font-weight: 900;

  ${breakPoints.mobileXL} {
    font-size: 28px;
  }

  &:first-of-type {
    margin-top: 0px;
  }
`;

export const P = styled.p`
  line-height: 1.2;
  margin-bottom: 15px;
`;

export const Suggested = styled.div`
  margin-top: 10px;
  font-family: var(--normal-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.2;
`;

export const Strong = styled.span`
  font-weight: 500;
  color: #444;
`;

export const TagLink = styled(Link)`
  text-decoration: none;

  &:link,
  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-1);
  }
`;
