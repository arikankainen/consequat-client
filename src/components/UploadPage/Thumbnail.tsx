import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { setError } from '../../reducers/notificationReducer';
import { updateSelected, removePicture } from '../../reducers/pictureReducer';
import resizeImage from '../../utils/resizeImage';

import { ReactComponent as CheckedIcon } from '../../images/icon_checked.svg';
import placeholder from '../../images/placeholder.png';

const query = (col: number, minWidth: number, maxWidth: number): string => {
  const width = 94 / col;
  const margin = 3 / col;
  const marginTop = 2 / col;

  return `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
    width: ${width}%;
    margin-left: ${margin}%;
    margin-right: ${margin}%;
    margin-top: ${marginTop}%;
  }`;
};

interface ContainerProps {
  selected: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
	box-sizing: border-box;
	cursor: pointer;

  margin: 10px;
  padding: 1px;
  background-color: var(--navigation-bg-color);
  border: 1px solid #111;

  ${query(21, 3900, 9999)}
  ${query(20, 3900, 4099)}
  ${query(19, 3700, 3899)}
  ${query(18, 3500, 3699)}
  ${query(17, 3300, 3499)}
  ${query(16, 3100, 3299)}
  ${query(15, 2900, 3099)}
  ${query(14, 2700, 2899)}
  ${query(13, 2500, 2699)}
  ${query(12, 2300, 2499)}
  ${query(11, 2100, 2299)}
  ${query(10, 1900, 2099)}
  ${query(9, 1700, 1899)}
  ${query(8, 1500, 1699)}
  ${query(7, 1300, 1499)}
  ${query(6, 1100, 1299)}
  ${query(5, 900, 1099)}
  ${query(4, 700, 899)}
  ${query(3, 500, 699)}
  ${query(2, 320, 499)}
  ${query(1, 0, 319)}

  &:hover {
    border: 1px solid var(--navigation-bg-color-hover);
  }

  ${props => props.selected
    && css`
      border: 1px solid var(--accent-color-2);

      &:hover {
        border: 1px solid var(--accent-color-2-hover);
      }
  `}
`;

const Picture = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const IconArea = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  background: rgb(0, 0, 0, 0.5);
  border: 1px solid rgb(255, 255, 255, 0.3);

  & > svg {
    height: var(--icon-size);
    color: #fff;
  }
`;

interface ProgressProps {
  progress: number;
}

const Progress = styled.progress<ProgressProps>`
  position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-right: 10px;
  appearance: none;
  display: block;
  height: 10px;
  background-color: var(--progress-back);
  border: 1px solid rgb(255, 255, 255, 0.3);

  &::-webkit-progress-bar { /* background-color (chrome, safari, opera) */
    background-color: var(--progress-back);
  }

  &::-moz-progress-bar { /* progress-color (firefox) */
    background-color: var(--accent-color-2);

    ${props => props.progress === 100
    && css`
      background-color: var(--color-success);
    `}
  }

  &::-webkit-progress-value { /* progress-color (chrome, safari, opera) */
    background-color: var(--accent-color-2);

    ${props => props.progress === 100
    && css`
      background-color: var(--color-success);
    `}
  }
`;

interface ThumbnailProps {
  picture: File;
  progress: number;
  selected: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ picture, progress, selected }) => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const thumbnailImage = useRef<HTMLImageElement>(null);
  const progressBar = useRef<HTMLProgressElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    resizeImage(picture, true, 500)
      .then(blob => {
        if (thumbnailImage.current) {
          thumbnailImage.current.src = URL.createObjectURL(blob);
        }
      }, () => {
        dispatch(removePicture(picture.name));
        dispatch(setError('Error', `Cannot read file '${picture.name}'.`));
      });
  }, [picture]); //eslint-disable-line
  
  const handleThumbnailClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (event.ctrlKey) {
      dispatch(updateSelected(picture.name, !selected));
    }
    else {
      pictureState.pictures.forEach(element => {
        if (element.selected) {
          dispatch(updateSelected(element.picture.name, false));
        }
      });
      dispatch(updateSelected(picture.name, true));
    }
  };

  const handleCheckClick = () => {
    dispatch(updateSelected(picture.name, !selected));
  };

  return (
    <Container
      ref={container}
      selected={selected}>
      
      <Picture
        ref={thumbnailImage}
        onClick={handleThumbnailClick}
        src={placeholder} />

      <IconArea onClick={handleCheckClick}>
        {selected && <CheckedIcon />}
      </IconArea>
      
      {progress > 0 && <Progress
        max='100'
        ref={progressBar}
        value={progress}
        progress={progress}
      />}
    </Container>
  );
};

export default Thumbnail;