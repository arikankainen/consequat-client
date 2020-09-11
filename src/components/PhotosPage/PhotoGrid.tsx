import React from 'react';
import { PhotoUserExtended } from '../../utils/types';
import { PageContainer, GridContainer } from './style';
import PhotoGridItem from './PhotoGridItem';

interface PhotoGridProps {
  photos: PhotoUserExtended[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  if (!photos) return null;

  return (
    <PageContainer>
      <GridContainer>
        {photos.map(photo => (
          <PhotoGridItem key={photo.id} photo={photo} />
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default PhotoGrid;
