import styled from 'styled-components/macro';

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const OuterContainerDark = styled(OuterContainer)`
  background-color: var(--bg-color-dark);
`;

export const Topic = styled.div`
  color: #000;
  font-family: var(--topic-font-family);
  font-size: 24px;
  font-weight: 200;
`;

export const TopicDark = styled(Topic)`
  color: #666;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  color: #000;
`;

export const ContainerDark = styled(Container)`
  color: #666;
`;
