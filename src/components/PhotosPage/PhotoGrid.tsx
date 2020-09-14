import React from 'react';
import { PhotoUserExtended } from '../../utils/types';
import { TopicContainer, GridContainer } from './style';
import PhotoGridItem from './PhotoGridItem';

interface PhotoGridProps {
  photos: PhotoUserExtended[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  if (!photos) return null;

  return (
    <>
      <TopicContainer>Browse all photos</TopicContainer>
      <GridContainer>
        {photos.map(photo => (
          <PhotoGridItem key={photo.id} photo={photo} />
        ))}
      </GridContainer>
    </>
  );
};

export default PhotoGrid;
