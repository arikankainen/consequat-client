import React from 'react';
import { Photo } from '../../utils/types';
import { ItemContainer, ItemOuterContainer, ImageContainer, Image } from './style';

interface PhotoGridItemProps {
  photo: Photo;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo }) => {
  if (!photo) return null;

  const rnd = Math.random() >= 0.5;
  console.log(rnd);

  return (
    <ItemOuterContainer key={photo.id} portrait={rnd}>
      <ItemContainer>
        <ImageContainer>
          <Image src={photo.thumbUrl} alt={photo.name} />
        </ImageContainer>
      </ItemContainer>
    </ItemOuterContainer>
  );
};

export default PhotoGridItem;
