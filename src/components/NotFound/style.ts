import styled from 'styled-components/macro';

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Topic = styled.div`
  color: #000;
  font-family: var(--topic-font-family);
  font-size: 24px;
  font-weight: 200;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  color: #000;

  & > svg {
    height: var(--image-size);
    color: var(--image-color);
    margin-bottom: 20px;
  }
`;
