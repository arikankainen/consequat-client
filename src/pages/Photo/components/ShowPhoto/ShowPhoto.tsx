import React from 'react';
import { PhotoUserExtended } from 'utils/types';
import * as Styled from './style';
import PhotoInfo from '../PhotoInfo/PhotoInfo';
import Photo from '../Photo/Photo';

interface ShowPhotoProps {
  photo: PhotoUserExtended | null;
  commentCount: number;
  prevPhoto: string | undefined;
  nextPhoto: string | undefined;
  prevAddress: string;
  children: JSX.Element;
}

const ShowPhoto: React.FC<ShowPhotoProps> = ({
  photo,
  commentCount,
  prevPhoto,
  nextPhoto,
  prevAddress,
  children,
}) => {
  return (
    <Styled.GridContainer>
      <Photo
        photo={photo}
        prevPhoto={prevPhoto}
        nextPhoto={nextPhoto}
        prevAddress={prevAddress}
      />
      <PhotoInfo photo={photo} commentCount={commentCount}>
        {children}
      </PhotoInfo>
    </Styled.GridContainer>
  );
};

export default ShowPhoto;
