import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
  max-width: ${breakPoints.laptopLWidth};
  padding: 40px;

  ${breakPoints.mobileXL} {
    padding: 20px;
  }
`;

export const H1 = styled.h1`
  margin-bottom: 20px;
  font-family: var(--topic-font-family);
  font-weight: 900;
  font-size: 36px;
  color: #000;
`;

export const H2 = styled.h1`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 20px;
  color: #000;

  & > svg {
    height: 24px;
    width: 24px;
    color: #000;
    margin-right: 10px;
  }
`;

export const P = styled.p`
  font-family: var(--default-font-family);
  font-weight: 200;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
  line-height: 1.4;
`;

export const Strong = styled.span`
  font-weight: 500;
`;

export const Warning = styled(P)`
  margin-top: 20px;
  font-weight: 400;
  margin-bottom: 0px;
`;

export const Link = styled.a`
  font-weight: 400;
  text-decoration: none;

  &:link,
  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-2-hover);
  }
  
`;

export const Code = styled.span`
  margin-top: 4px;
  font-family: var(--mono-font-family);
  font-size: 13px;
  font-weight: 300;
`;
