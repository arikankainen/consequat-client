import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px;
`;

interface ThumbnailProps {
  picture: File;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ picture }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  
  if (FileReader && picture) {
    console.log('1');
    const reader = new FileReader();
    reader.readAsDataURL(picture);

    if (reader !== null) {
      console.log('2');
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (canvas.current && event.target?.readyState == FileReader.DONE) {
          console.log('3');
          const ctx = canvas.current.getContext('2d');
          const image = new Image();
          image.src = event.target.result as string;
          console.log('res', event.target.result);
          if (ctx) {
            console.log('4');
            ctx.rect(0, 0, 100, 100);
            ctx.strokeStyle = '#ff0000';
            ctx.stroke();
            ctx.drawImage(image, 100, 100);
          }
        }
      };
    }
  }

  return (
    <Container>
      {picture.name}<br />
      <canvas ref={canvas} style={{ border: '1px solid green' }}>

      </canvas>
    </Container>
  );
};

export default Thumbnail;