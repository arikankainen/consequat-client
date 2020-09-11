import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-auto-rows: minmax(120px, 140px);
  grid-gap: 5px;
  /*grid-auto-flow: dense;*/
`;

interface ItemOuterContainerProps {
  portrait: boolean;
}

export const ItemOuterContainer = styled.div<ItemOuterContainerProps>`
  grid-column: span 1;
  /*
  ${props =>
    props.portrait &&
    css`
      grid-row: span 1;
  `}

  ${props =>
    !props.portrait &&
    css`
      grid-column: span 1;
  `}
  */
`;

export const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;
