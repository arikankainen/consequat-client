import React from 'react';
import { ScrollPosition } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { PhotoUserExtended } from '../../utils/types';
import {
  ItemContainer,
  ImageContainer,
  Image,
  InfoContainer,
  InfoName,
  InfoUser,
} from './style';

interface PhotoGridItemProps {
  photo: PhotoUserExtended;
  scrollPosition: ScrollPosition;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo, scrollPosition }) => {
  if (!photo) return null;

  return (
    <ItemContainer key={photo.id}>
      <Link to={`/photos/photo/${photo.id}`}>
        <ImageContainer>
          <Image
            src={photo.thumbUrl}
            alt={photo.name}
            scrollPosition={scrollPosition}
            effect="opacity"
          />
        </ImageContainer>
        <InfoContainer>
          <InfoName>{photo.name}</InfoName>
          <InfoUser>photo by {photo.user.fullname}</InfoUser>
        </InfoContainer>
      </Link>
    </ItemContainer>
  );
};

export default PhotoGridItem;
