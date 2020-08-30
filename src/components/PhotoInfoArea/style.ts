import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
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
  }
`;

export const Property = styled.div`
  color: #eee;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

export const Value = styled.div`
  margin-left: 15px;
  color: #ddd;
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.4;
`;
