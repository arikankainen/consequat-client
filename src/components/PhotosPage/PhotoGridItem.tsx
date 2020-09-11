import React from 'react';
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

  const rnd = Math.random() >= 0.5;
  console.log(rnd);

  return (
    <ItemContainer key={photo.id} landscape={rnd}>
      <ImageContainer>
        <Image src={photo.thumbUrl} alt={photo.name} />
      </ImageContainer>
      <InfoContainer>
        <InfoName>{photo.name}</InfoName>
        <InfoUser>photo by {photo.user.fullname}</InfoUser>
      </InfoContainer>
    </ItemContainer>
  );
};

export default PhotoGridItem;
