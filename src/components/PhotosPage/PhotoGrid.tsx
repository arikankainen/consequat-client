import React from 'react';
import { Photo } from '../../utils/types';
import { Container } from './style';
import PhotoGridItem from './PhotoGridItem';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  if (!photos) return null;

  return (
    <Container>
      {photos.map(photo => (
        <PhotoGridItem key={photo.id} photo={photo} />
      ))}
    </Container>
  );
};

export default PhotoGrid;
