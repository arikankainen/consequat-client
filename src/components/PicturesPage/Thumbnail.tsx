import React from 'react';
import { Photo } from '../../utils/types';

import { ReactComponent as CheckedIcon } from '../../images/icon_checked.svg';

import {
  ThumbnailContainer,
  ThumbnailPlaceholder,
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
      <ThumbnailPlaceholder>
        <ThumbnailPicture
          onClick={() => handleThumbnailClick(photo.id)}
          src={photo.thumbUrl}
          onError={(e: React.InvalidEvent<HTMLImageElement>) => { e.target.style.display = 'none'; }}
        />
      </ThumbnailPlaceholder>

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