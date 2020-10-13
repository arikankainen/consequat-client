import styled, { css } from 'styled-components/macro';
import back1920 from 'images/back_01_1920.jpg';

export const SiteContainer = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
  height: 100%;
  width: 100%;
`;

export const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
`;

interface MainBackProps {
  picture: boolean;
}

export const MainBack = styled(Main)<MainBackProps>`
  ${props =>
    props.picture &&
    css`
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(${back1920});
  `}
`;
