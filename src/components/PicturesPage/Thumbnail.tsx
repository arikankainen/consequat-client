import React from 'react';
import { Photo } from '../../utils/types';

import {
  ThumbnailContainer,
  ThumbnailPicture,
  ThumbnailNameArea,
  ThumbnailNameAreaText,
} from '../UploadPage/Styles';

interface ThumbnailProps {
  photo: Photo;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ photo }) => {
  return (
    <ThumbnailContainer>
      <ThumbnailPicture
        src={photo.thumbUrl}
      />

      <ThumbnailNameArea>
        <ThumbnailNameAreaText>
          {photo.name}
        </ThumbnailNameAreaText>
      </ThumbnailNameArea>

    </ThumbnailContainer>
  );
};

export default Thumbnail;