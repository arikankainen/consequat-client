import React from 'react';
import { Photo } from '../../utils/types';

import { ReactComponent as CheckedIcon } from '../../images/icon_checked.svg';

import {
  ThumbnailContainer,
  ThumbnailPicture,
  ThumbnailIconArea,
  ThumbnailNameArea,
  ThumbnailNameAreaText,
} from '../PictureList/Styles';

interface ThumbnailProps {
  photo: Photo;
  selected: boolean;
  handleThumbnailClick: (id: string) => void;
  handleCheckClick: (id: string) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  photo,
  selected,
  handleThumbnailClick,
  handleCheckClick
}) => {
  return (
    <ThumbnailContainer>
      <ThumbnailPicture
        width="300"
        height="300"
        onClick={() => handleThumbnailClick(photo.id)}
        src={photo.thumbUrl}
      />

      <ThumbnailIconArea onClick={() => handleCheckClick(photo.id)} selected={selected}>
        {selected && <CheckedIcon />}
      </ThumbnailIconArea>

      <ThumbnailNameArea>
        <ThumbnailNameAreaText>
          {photo.name}
        </ThumbnailNameAreaText>
      </ThumbnailNameArea>

    </ThumbnailContainer>
  );
};

export default Thumbnail;