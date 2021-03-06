import styled, { css } from 'styled-components/macro';

interface ThumbnailContainerProps {
  selected: boolean;
}

export const ThumbnailContainer = styled.div<ThumbnailContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
	cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.5);

  ${props =>
    props.selected &&
    css`
      border: 5px solid var(--icon-color-hover);
      border-radius: 4px;
      /* padding: 1px; */
  `}
`;

export const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  background-color: #f7f7f7;
`;

export const ThumbnailPicture = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  object-fit: cover;
  width: 100%;
  height: 100%;

  &:hover {
    filter: brightness(1.15);
  }

  transition: all .2s ease-in-out;
`;

interface ThumbnailSelectIconAreaProps {
  selected: boolean;
}

export const ThumbnailSelectIconArea = styled.div<ThumbnailSelectIconAreaProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 5px;
  left: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  pointer-events: none;

  ${props =>
    props.selected &&
    css`
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 1);
  `}

  & > svg {
    margin-top: 1px;
    height: 14px;
    color: #222;
  }
`;

export const ThumbnailHiddenIconArea = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  pointer-events: none;

  & > svg {
    height: 18px;
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
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: none;
`;

export const ThumbnailNameAreaText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 10px;
  line-height: 1;
`;
