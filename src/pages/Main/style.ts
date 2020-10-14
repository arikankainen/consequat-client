import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';
import { Link } from 'react-router-dom';
import back from 'images/back_main.jpg';

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${back});
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 30px 0px;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  
  ${breakPoints.mobileXL} {
    justify-content: flex-start;
  }
`;

export const ConsequatImage = styled.img`
  width: 100%;
  max-width: 750px;
  margin: 50px 0px;
  filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, .8));

  ${breakPoints.custom(900)} {
    width: 80vw;
    margin: 5vw 0px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 750px;
  height: 400px;

  ${breakPoints.custom(900)} {
    width: 80vw;
  }
`;

export const H1 = styled.h1`
  margin-bottom: 10px;
  font-family: var(--topic-font-family);
  font-size: 36px;
  font-weight: 900;
`;

export const P = styled.p`
  line-height: 1.2;
  margin-bottom: 15px;
`;

export const Suggested = styled.div`
  margin-top: 15px;
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
