import styled from 'styled-components/macro';

export const Author = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--alt-font-family);
  font-size: 24px;
  font-weight: 200;
  line-height: 1;

  & > svg {
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    color: #555;
    margin-right: 10px;
    margin-bottom: 3px;
  }
`;

export const Name = styled.div`
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  margin-top: 10px;
`;

export const Description = styled.div`
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.2;
  margin-top: 10px;
`;
