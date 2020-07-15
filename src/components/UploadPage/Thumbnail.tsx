import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  margin: 10px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  margin: 1px;
  border: 10px solid var(--navigation-bg-color);
`;

const Properties = styled.div`
  padding: 0px 10px;
  word-wrap: break-word;
  font-size: 12px;
`;

interface ThumbnailProps {
  picture: File;
  progress: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ picture, progress }) => {
  const image = useRef<HTMLImageElement>(null);
  
  const reader = new FileReader();
  reader.readAsDataURL(picture);

  reader.onload = function (event) {
    const elem = image.current;
    if (elem !== null && event.target !== null) {
      elem.src = event.target.result as string;
    }
  };
  
  return (
    <Container>
      <Image ref={image} />
      <Properties>
        {picture.name}<br />
        Upload progress: {progress} %
      </Properties>
    </Container>
  );
};

export default Thumbnail;