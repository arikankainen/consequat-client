import React from 'react';
import { PhotoUserExtended } from 'utils/types';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { ReactComponent as LeftIcon } from 'images/chevron-left-solid.svg';
import { ReactComponent as RightIcon } from 'images/chevron-right-solid.svg';
import { ReactComponent as GalleryIcon } from 'images/th-solid.svg';
import SpinnerCentered from 'components/SpinnerCentered/SpinnerCentered';
import * as Styled from './style';
import PhotoInfoExif from '../PhotoInfoExif/PhotoInfoExif';

interface PhotoProps {
  photo: PhotoUserExtended | null;
  prevPhoto: string | undefined;
  nextPhoto: string | undefined;
  prevAddress: string;
}

const Photo: React.FC<PhotoProps> = ({
  photo,
  prevPhoto,
  nextPhoto,
  prevAddress,
}) => {
  if (!photo) {
    return (
      <Styled.PictureContainer>
        <SpinnerCentered dark={true} />
      </Styled.PictureContainer>
    );
  }

  return (
    <Styled.PictureContainer>
      {prevAddress && (
        <Styled.BackLink to={prevAddress}>
          <GalleryIcon />
          Back to photos
        </Styled.BackLink>
      )}

      <Styled.Image src={photo.mainUrl} alt={photo.name} effect="opacity" />
      <PhotoInfoExif exif={photo.exif} />

      {prevPhoto && (
        <Styled.LeftArrow to={prevPhoto}>
          <LeftIcon />
        </Styled.LeftArrow>
      )}

      {nextPhoto && (
        <Styled.RightArrow to={nextPhoto}>
          <RightIcon />
        </Styled.RightArrow>
      )}
    </Styled.PictureContainer>
  );
};

export default Photo;
