import React from 'react';
import { Photo } from '../../utils/types';
import { GridContainer } from './style';
import PhotoGridItem from './PhotoGridItem';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  if (!photos) return null;

  return (
    <GridContainer>
      {photos.map(photo => (
        <PhotoGridItem key={photo.id} photo={photo} />
      ))}
    </GridContainer>
  );
};

export default PhotoGrid;
