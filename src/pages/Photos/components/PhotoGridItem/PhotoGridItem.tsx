import React from 'react';
import { ScrollPosition } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { PhotoUserExtended } from 'utils/types';
import * as Styled from './style';

interface PhotoGridItemProps {
  photo: PhotoUserExtended;
  scrollPosition: ScrollPosition;
  listAddress: string;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({
  photo,
  scrollPosition,
  listAddress,
}) => {
  if (!photo) return null;

  return (
    <Styled.ItemContainer key={photo.id}>
      <Link to={`/photos/photo/${photo.id}?prev=${listAddress}`}>
        <Styled.ImageContainer>
          <Styled.Image
            src={photo.thumbUrl}
            alt={photo.name}
            scrollPosition={scrollPosition}
            effect="opacity"
          />
        </Styled.ImageContainer>
        <Styled.InfoContainer>
          <Styled.InfoName>{photo.name}</Styled.InfoName>
          <Styled.InfoUser>photo by {photo.user.fullname}</Styled.InfoUser>
        </Styled.InfoContainer>
      </Link>
    </Styled.ItemContainer>
  );
};

export default PhotoGridItem;
