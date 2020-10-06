import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  margin-left: auto;
  margin-right: auto;
  padding: 50px 50px 50px 50px;

  ${breakPoints.tablet} {
    padding: 30px 20px 30px 20px;
  }
`;

export const InfoContainerEmpty = styled(InfoContainer)`
  height: calc(40vh - var(--header-height));
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AuthorGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 40px;

  ${breakPoints.custom(600)} {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

export const AuthorGridItem = styled.div`

`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin: 30px 0px;
`;
