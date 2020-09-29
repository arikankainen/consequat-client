import styled, { css } from 'styled-components/macro';
import back1920 from '../../images/back_01_1920.jpg';

interface SiteContainerProps {
  picture: boolean;
}

export const SiteContainer = styled.section<SiteContainerProps>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    'header'
    'main'
    'footer';
  height: 100%;
  width: 100%;

  ${props =>
    props.picture &&
    css`
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(${back1920});
  `}
`;

export const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
