import React from 'react';
import { Photo } from '../../utils/types';
import { ItemContainer, ImageContainer, Image, InfoContainer } from './style';

interface PhotoGridItemProps {
  photo: Photo;
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
      <InfoContainer>{photo.name}</InfoContainer>
    </ItemContainer>
  );
};

export default PhotoGridItem;
