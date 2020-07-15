import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 250px;
  margin: 10px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 250px;
  height: 250px;
  margin: 1px;
  border: 10px solid var(--navigation-bg-color);
`;

const Properties = styled.div`
  padding: 0px;
  word-wrap: break-word;
  font-size: 12px;
`;

interface ProgressProps {
  progress: number;
}

const Progress = styled.progress<ProgressProps>`
  appearance: none;
  height: 10px;
  width: 100%;
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
  
  const reader = new FileReader();
  reader.readAsDataURL(picture);

  reader.onload = function (event) {
    const elem = thumbnailImage.current;
    if (elem !== null && event.target !== null) {
      elem.src = event.target.result as string;
    }
  };
  
  return (
    <Container>
      <Image ref={thumbnailImage} />
      <Properties>
        {picture.name}<br />
        Upload progress: {progress}%<br />
        <Progress ref={progressBar} max='100' value={progress} progress={progress} />
      </Properties>
    </Container>
  );
};

export default Thumbnail;