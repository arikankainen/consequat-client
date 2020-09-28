import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: ${breakPoints.laptopWidth};
`;

export const TextBlock = styled.div`
  padding: 20px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: var(--default-box-shadow);
`;

export const H1 = styled.h1`
  margin-bottom: 20px;
  font-family: var(--topic-font-family);
  font-weight: 900;
  font-size: 36px;
  color: #000;
`;

export const H2 = styled.h1`
  margin-top: 20px;
  margin-bottom: 5px;
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 20px;
  color: #000;
`;

export const P = styled.p`
  font-family: var(--default-font-family);
  font-weight: 200;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
`;

export const Strong = styled.span`
  font-weight: 500;
`;

export const Warning = styled(P)`
  margin-top: 20px;
  font-weight: 500;
  margin-bottom: 0px;
`;

export const Link = styled.a`
  font-weight: 500;
  text-decoration: none;

  &:link,
  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-2-hover);
  }
  
`;
