import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { setError } from '../../reducers/notificationReducer';
import { updateSelected } from '../../reducers/pictureReducer';
import Filename from './Filename';

interface ContainerProps {
  selected: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 10px;
  background-color: var(--navigation-bg-color);
  border: 5px solid #111;

  &:hover {
    border: 5px solid var(--navigation-bg-color-hover);
  }

  ${props => props.selected
    && css`
      border: 5px solid var(--color-success);

      &:hover {
        border: 5px solid var(--color-success-hover);
      }
  `}
`;

const pageMargin = '45px';  // imagecontainer paddings + possible scrollbar
const imageMargin = '30px'; // margins, padding and border around image

const query = (col: number, minWidth: number, maxWidth: number): string => {
  return `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) { --columns: ${col}; }`;
};

const PictureContainer = styled.div`
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

  display: block;
  width: calc(((100vw - ${pageMargin}) / var(--columns)) - ${imageMargin});
  height: calc(((100vw - ${pageMargin}) / var(--columns)) - ${imageMargin});
`;

const Picture = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
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
  selected: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ picture, progress, selected }) => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const thumbnailImage = useRef<HTMLImageElement>(null);
  const progressBar = useRef<HTMLProgressElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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
    <Container ref={container} selected={selected}>
      <PictureContainer>
        <Picture ref={thumbnailImage} onClick={handleClick} />
      </PictureContainer>
    </Container>
  );
};

export default Thumbnail;

/*
      <Properties>
        <Filename text={picture.name} />
        <Progress ref={progressBar} max='100' value={progress} progress={progress} />
      </Properties>
*/