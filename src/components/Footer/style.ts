import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';

export const FooterContainer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
  /*height: 50px;*/
  min-height: 50px;
  background-color: #000;
  background-color: var(--footer-bg-color);
  color: #888;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
  width: 100%;
  max-width: ${breakPoints.laptopWidth};

  ${breakPoints.custom(600)} {
    grid-template-columns: 100%;
  }
`;

const Grid = styled.div`
  padding: 40px;

  ${breakPoints.custom(450)} {
    padding: 20px;
  }
`;

export const GridLeft = styled(Grid)`
`;

export const GridRight = styled(Grid)`
`;

export const Section = styled.section`
  margin-top: 40px;
  
  &:first-of-type {
    margin-top: 0px;
  }
`;

export const P = styled.p`
  margin-top: 10px;
  font-family: var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
`;

export const BlockP = styled(P)`
  display: flex;
  flex-direction: column;
`;

export const H1 = styled.h1`
  display: flex;
  align-items: center;
  font-family: var(--topic-font-family);
  font-size: 20;
  font-weight: 200;
  color: #bbb;
  line-height: 1;

  & > svg {
    height: 24px;
    width: 24px;
    color: #bbb;
    margin-right: 10px;
  }
`;

export const Link = styled.a`
  font-family: inherit;
  font-weight: inherit;
  text-decoration: none;

  &:link,
  &:visited {
    color: #bbb;
  }

  &:hover {
    color: #fff;
  }
`;

export const ListLink = styled(Link)`
  display: inline-block;
  margin-top: 3px;
  margin-left: 10px;
`;

export const Line = styled.div`
  border-bottom: 1px solid #444;
  display: none;

  ${breakPoints.custom(600)} {
    display: block;
    margin-top: -50px;
    margin-bottom: 50px;
  }

  ${breakPoints.custom(450)} {
    margin-top: -30px;
    margin-bottom: 30px;
  }
`;
