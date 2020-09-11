import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import breakPoints from '../../utils/breakPoints';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 220px;
  grid-gap: 5px;
  grid-auto-flow: dense;
  padding: 5px;

  height: 100%;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  background-color: #fff;

  ${breakPoints.set(600)} {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-template-rows: auto;
  }
  
  ${breakPoints.set(500)} {
    grid-template-columns: 100%;
    grid-auto-rows: 200px;
    padding: 0px;
  }
`;

interface ItemContainerProps {
  landscape: boolean;
}

export const ItemContainer = styled(Link)<ItemContainerProps>`
  width: 100%;
  height: 100%;
  position: relative;

  ${props =>
    props.landscape &&
    css`
      grid-column: span 2;
  `}

  &:hover {
    & > div:first-child > img {
      transform: scale(1.1);
    }
    
    & > div:last-child {
      opacity: 1;
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  transition: 0.7s ease-in-out;
  pointer-events: none;
`;

export const InfoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  bottom: 0;
  left: 0;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  height: 70px;
  pointer-events: none;
  opacity: 0;
  transition: 0.3s ease-in-out;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, .1) 20%,
    rgba(0, 0, 0, .3) 80%,
    rgba(0, 0, 0, .4) 100%
  );
`;

const InfoBase = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
  line-height: 1;
`;

export const InfoName = styled(InfoBase)`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

export const InfoUser = styled(InfoBase)`
  color: #ddd;
  margin-top: 5px;
  font-size: 10px;
  font-weight: 400;
`;
