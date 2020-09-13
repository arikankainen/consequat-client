import React from 'react';
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
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo }) => {
  if (!photo) return null;

  return (
    <ItemContainer key={photo.id} landscape={photo.width > photo.height}>
      <Link to={`/photos/photo/${photo.id}`}>
        <ImageContainer>
          <Image src={photo.thumbUrl} alt={photo.name} />
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
