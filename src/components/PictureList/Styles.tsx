import styled, { css } from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const PictureListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
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

  ${breakPoints.laptop} {
    align-items: stretch;
  }
`;

export const PictureListButtonGroups = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${breakPoints.laptopWidth};

  ${breakPoints.laptop} {
    width: auto;
  }
`;

export const PictureListButtonGroup = styled.div`
  display: flex;
  margin: 0px 15px;

  ${breakPoints.laptop} {
    margin: 0px 5px;
  }
`;

export const PictureListHeaderContainer = styled.div`
  display: block;
  width: 100%;
`;

export const PictureListHeaderContent = styled.div`
  display: block;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 2px;
  padding: 10px;
  background-color: var(--picturelist-header-bg-color);
  color: var(--picturelist-header-color);
  font-size: 18px;
  line-height: 1;

  ${breakPoints.laptop} {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

interface PictureListAreaProps {
  count: number;
}

export const PictureListArea = styled.div<PictureListAreaProps>`
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

export const PictureListToolBarButtonText = styled.div`
  margin-top: 1px;
  margin-left: 7px;

  ${breakPoints.mobileXL} {
    display: none;
  }
`;

export const PictureListToolBarButton = styled.button`
  display: flex;
  margin: 10px 5px;
  padding: 7px 10px;
  background-color: var(--accent-color-2);
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  font-size: var(--default-font-size);
  line-height: 1;
  cursor: pointer;

  & > svg {
    height: 16px;
    color: #fff;
  }

  &:focus {
    outline-width: 0;
  }

  &:hover {
    background-color: var(--accent-color-2-hover);
  }
  
  &:disabled {
    background-color: var(--accent-color-2-disabled);
    color: #000755;
    /*cursor: wait;*/

    & > svg {
      color: #000755;
    }
  }
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