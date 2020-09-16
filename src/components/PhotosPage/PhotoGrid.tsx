import React from 'react';
import { trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { PhotoUserExtended } from '../../utils/types';
import { TopBar, Text, TopicContainer, Keyword, GridContainer } from './style';
import PhotoGridItem from './PhotoGridItem';
import DropDown from '../DropDown/DropDown';

interface PhotoGridProps {
  photos: PhotoUserExtended[];
  search: string | undefined | null;
  scrollPosition: ScrollPosition;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, search, scrollPosition }) => {
  if (!photos) return null;

  return (
    <>
      {search ? (
        <>
          <TopBar>
            <Text>
              Found <Keyword>{photos.length}</Keyword> photos
            </Text>
            <DropDown />
          </TopBar>
          <TopicContainer>
            Browsing photos containing <Keyword>{search}</Keyword>
          </TopicContainer>
        </>
      ) : (
        <TopicContainer>Browsing all photos</TopicContainer>
      )}
      <GridContainer>
        {photos.map(photo => (
          <PhotoGridItem key={photo.id} photo={photo} scrollPosition={scrollPosition} />
        ))}
      </GridContainer>
    </>
  );
};

export default trackWindowScroll(PhotoGrid);
