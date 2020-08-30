import styled, { css } from 'styled-components';

import back1280 from '../../images/back_01_1280.jpg';
import back1920 from '../../images/back_01_1920.jpg';
import back2560 from '../../images/back_01_2560.jpg';
import back3840 from '../../images/back_01_3840.jpg';

interface SiteContainerProps {
  picture: boolean;
}

export const SiteContainer = styled.section<SiteContainerProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  ${(props) =>
    props.picture &&
    css`
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      
      @media screen and (max-width: 1280px) {
        background-image: url(${back1280});
      }

      @media screen and (min-width: 1281px) and (max-width: 1920px) {
        background-image: url(${back1920});
      }

      @media screen and (min-width: 1921px) and (max-width: 2560px) {
        background-image: url(${back2560});
      }

      @media screen and (min-width: 2561px) {
        background-image: url(${back3840});
      }
  `}
`;

export const Main = styled.div`
  flex: auto;
`;
