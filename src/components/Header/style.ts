import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  min-height: var(--header-height);
  background-color: var(--navigation-bg-color);
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1000;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1 1 0%;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 1 0%;
`;
