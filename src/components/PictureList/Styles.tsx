import styled, { css } from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const PictureListOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PictureListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  padding: 0px 40px;
  
  ${breakPoints.laptop} {
    padding: 0px 0px;
  }
`;

export const PictureListToolBar = styled.div`
  position: sticky;
  top: var(--header-height);
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: rgba(23, 23, 25, 0.9);
  padding: 0px 5px;
`;

export const PictureListButtonGroups = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const PictureListButtonGroup = styled.div`
  display: flex;
`;

interface PictureListAreaProps {
  count: number;
}

export const PictureListArea = styled.div<PictureListAreaProps>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 2px;
  width: 100%;
  padding: 0px;
`;

export const UploadFileButton = styled.input`
  display: none;
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
	cursor: pointer;
`;

export const ThumbnailPicture = styled.img`
  background-color: rgba(255, 255, 255, 0.1);
  object-fit: cover;
  width: 100%;
  height: 100%;

  &:hover {
    filter: brightness(1.2);
  }
`;

interface ThumbnailIconAreaProps {
  selected: boolean;
}

export const ThumbnailIconArea = styled.div<ThumbnailIconAreaProps> `
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);

  ${props => props.selected && css`
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.5);
  `}

  & > svg {
    height: 30px;
    color: #fff;
  }
`;

export const ThumbnailNameArea = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ThumbnailNameAreaText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 12px;

  ${breakPoints.laptop} {
    font-size: 10px;
  }
`;