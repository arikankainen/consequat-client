import styled, { css } from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

export const ToolBar = styled.div`
  position: sticky;
  top: var(--header-height);
  z-index: 1;

  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgba(23, 23, 25, 0.9);
`;

export const ButtonGroups = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin: 0px 15px;

  ${breakPoints.laptop} {
    margin: 0px 5px;
  }
`;

interface PictureAreaProps {
  count: number;
}

export const PictureArea = styled.div<PictureAreaProps> `
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2px;
  width: 100%;
  padding: 20px;
  padding-top: 0px;

  ${breakPoints.laptop} {
    padding: 0px;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  ${breakPoints.mobileXL} {
    padding: 0px;
    ${props => props.count === 1 && css`
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    `}
  }
`;

export const FileButton = styled.input`
  display: none;
`;

export const ToolBarButton = styled.button`
  margin: 10px 5px;
  padding: 5px 10px;
  background-color: var(--accent-color-2);
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  font-size: var(--default-font-size);
  cursor: pointer;

  &:focus {
    outline-width: 0;
  }

  &:hover {
    background-color: var(--accent-color-2-hover);
  }
  
  &:disabled {
    background-color: var(--accent-color-2);
    cursor: wait;
  }
`;
