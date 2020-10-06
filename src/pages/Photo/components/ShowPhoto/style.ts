import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(100vh - var(--header-height)) 1fr;
  width: 100%;
  padding: 0px;

  ${breakPoints.custom(600)} {
    grid-template-rows: auto auto;
  }
`;
