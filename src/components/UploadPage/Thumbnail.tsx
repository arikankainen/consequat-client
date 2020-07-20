import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { setError } from '../../reducers/notificationReducer';
import { updateSelected, removePicture } from '../../reducers/pictureReducer';
import resizeImage from '../../utils/resizeImage';

import { ReactComponent as CheckedIcon } from '../../images/icon_checked.svg';
import placeholder from '../../images/placeholder.png';

interface ContainerProps {
  selected: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
	cursor: pointer;

  /*background-color: var(--navigation-bg-color);*/
  /*border: 1px solid #111;*/

  &:hover {
    /*border: 1px solid var(--navigation-bg-color-hover);*/
  }

  ${props => props.selected
    && css`
      /*border: 1px solid var(--accent-color-2);*/
  `}
  transition: all 50ms linear;
`;

const Picture = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;

  &:hover {
    filter: brightness(1.2);
  }
`;

interface IconAreaProps {
  selected: boolean;
}

const IconArea = styled.div<IconAreaProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0, 0.5);
  border: 1px solid rgb(255, 255, 255, 0.7);

  ${props => props.selected && css`
    background-color: rgb(0, 0, 0, 0.5);
    border: 1px solid rgb(0, 0, 0, 0.5);
  `}

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

      <IconArea onClick={handleCheckClick} selected={selected}>
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