import React from 'react';
import { PhotoUserExtended } from '../../utils/types';
import { TopicContainer, Keyword, GridContainer } from './style';
import PhotoGridItem from './PhotoGridItem';

interface PhotoGridProps {
  photos: PhotoUserExtended[];
  search: string | undefined;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, search }) => {
  if (!photos) return null;

  return (
    <>
      {search ? (
        <TopicContainer>
          Browsing photos containing <Keyword>{search}</Keyword>
        </TopicContainer>
      ) : (
        <TopicContainer>Browsing all photos</TopicContainer>
      )}
      <GridContainer>
        {photos.map(photo => (
          <PhotoGridItem key={photo.id} photo={photo} />
        ))}
      </GridContainer>
    </>
  );
};

export default PhotoGrid;
