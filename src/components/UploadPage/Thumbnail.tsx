import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setError } from '../../reducers/notificationReducer';
import Filename from './Filename';

const Container = styled.div`
  width: 270px;
  margin: 10px;
  background-color: var(--navigation-bg-color);
  border: 10px solid var(--navigation-bg-color);
`;

const Picture = styled.img`
  object-fit: cover;
  width: 250px;
  height: 250px;
`;

const Properties = styled.div`
  word-wrap: break-word;
  font-size: var(--default-font-size-small);
`;

interface ProgressProps {
  progress: number;
}

const Progress = styled.progress<ProgressProps>`
  appearance: none;
  display: block;
  height: 5px;
  width: 100%;
  margin-bottom: 5px;
  background-color: var(--progress-back);

  &::-webkit-progress-bar { /* background-color (chrome, safari, opera) */
    background-color: var(--progress-back);
  }

  &::-moz-progress-bar { /* progress-color (firefox) */
    background-color: var(--color-inprogress);

    ${props => props.progress === 100
    && css`
      background-color: var(--color-success);
    `}
  }

  &::-webkit-progress-value { /* progress-color (chrome, safari, opera) */
    background-color: var(--color-inprogress);

    ${props => props.progress === 100
    && css`
      background-color: var(--color-success);
    `}
  }
`;

interface ThumbnailProps {
  picture: File;
  progress: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ picture, progress }) => {
  const thumbnailImage = useRef<HTMLImageElement>(null);
  const progressBar = useRef<HTMLProgressElement>(null);
  const dispatch = useDispatch();

  function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      
      image.onload = () => {
        const width = image.width;
        const height = image.height;
            
        if (width <= maxWidth && height <= maxHeight) {
          resolve(file);
        }

        let newWidth;
        let newHeight;

        if (width > height) {
          newHeight = height * (maxWidth / width);
          newWidth = maxWidth;
        } else {
          newWidth = width * (maxHeight / height);
          newHeight = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(image, 0, 0, newWidth, newHeight);
        canvas.toBlob(resolve, file.type);
      };

      image.onerror = reject;
    });
  }

  resizeImage(picture, 500, 500).then(blob => {
    if (thumbnailImage.current) {
      thumbnailImage.current.src = URL.createObjectURL(blob);
    }
  }, () => {
    dispatch(setError('Error', `Cannot read file '${picture.name}'.`));
  });
  
  return (
    <Container>
      <Picture ref={thumbnailImage} />
      <Properties>
        <Filename text={picture.name} />
        <Progress ref={progressBar} max='100' value={progress} progress={progress} />
      </Properties>
    </Container>
  );
};

export default Thumbnail;