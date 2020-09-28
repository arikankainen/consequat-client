import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  max-width: ${breakPoints.laptopLWidthNumber - 70}px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;

  ${breakPoints.tablet} {
    padding: 0px 5px;
    padding-bottom: 8px;
    padding-bottom: 15px;
    padding-top: 5px;
  }
`;

export const Expand = styled.div`
  position: absolute;
  bottom: -18px;
  left: calc(50% - 8px);
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
    padding-bottom: 1px;
    background-color: #000;
    border-radius: 50%;
    box-shadow: 0 0 1px 2px rgba(255, 255, 255, .6);
    color: #aaa;
  }

  &:hover {
    & > svg {
      color: #fff;
    }
  }
`;
