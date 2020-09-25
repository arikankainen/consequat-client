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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  margin-left: auto;
  margin-right: auto;
  padding: 30px 20px 20px 20px;
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
`;

export const AuthorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 40px;

  ${breakPoints.custom(600)} {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

export const AuthorGridItem = styled.div`

`;

export const Author = styled.div`
  font-family: var(--alt-font-family);
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
`;

export const Name = styled.div`
  font-family: var(--alt-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  margin-top: 15px;
`;

export const Description = styled.div`
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.2;
  margin-top: 15px;
`;

export const PropertyWithIcon = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  margin-top: 15px;

  & > svg {
    height: 16px;
    color: #555;
    margin-right: 7px;
    margin-bottom: 2px;
  }

  &:first-child {
    margin-top: 0px;
  }
`;
