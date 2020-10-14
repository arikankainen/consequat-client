import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  padding: 20px 0px;
  max-width: ${breakPoints.laptopLWidth};
  
  ${breakPoints.mobileXL} {
    justify-content: flex-start;
  }
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

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 750px;

  ${breakPoints.custom(900)} {
    width: 80vw;
  }
`;
