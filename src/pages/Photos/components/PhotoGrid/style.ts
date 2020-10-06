import styled from 'styled-components/macro';
import breakPoints from '../../../../utils/breakPoints';

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  padding: 10px;
`;

export const Text = styled.div`
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 14px;
  color: #222;
  line-height: 1;
  padding-top: 6px;
`;

export const TopicContainer = styled.div`
  width: 100%;
  padding: 20px 20px 20px 20px;
  max-width: ${breakPoints.laptopLWidth};
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 20px;
  color: #222;
  line-height: 1;
  text-align: center;
`;

export const Keyword = styled.span`
  display: inline;
  font-family: inherit;
  font-weight: 400;
`;

export const GridContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  margin-bottom: 7px;
`;

export const ItemOuterContainer = styled.div`
  position: absolute;
`;
