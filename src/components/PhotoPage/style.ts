import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import breakPoints from '../../utils/breakPoints';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /*grid-template-rows: calc(100vh - var(--header-height)) 1fr;*/
  grid-template-rows: calc(100vh - 500px) 1fr;
  width: 100%;
  padding: 0px;
`;

export const PictureContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #1d1d1f;

  & > span {
    display: flex !important;
    justify-content: center;
    align-items: center;
    max-width: calc(100% - 80px);
    height: calc(100% - 60px);
  }
`;

export const Image = styled(LazyLoadImage)`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  & > svg {
    width: 16px;
    color: #999;
  }
`;

export const LeftArrow = styled(Arrow)`
  left: 10px;
`;

export const RightArrow = styled(Arrow)`
  right: 10px;
`;

/******************************************/

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  margin-left: auto;
  margin-right: auto;
  border: 1px solid red;
  padding: 20px;
`;

export const Author = styled.div`
  font-family: var(--topic-font-family);
  font-size: 24px;
  font-weight: 200;
  color: #000;
`;
