import React from 'react';
import { ReactComponent as CheckedIcon } from '../../images/icon_checked.svg';

import {
  ThumbnailContainer,
  ThumbnailPlaceholder,
  ThumbnailPicture,
  ThumbnailIconArea,
  ThumbnailNameArea,
  ThumbnailNameAreaText,
} from './style';

interface ThumbnailProps {
  src: string;
  name: string;
  selected: boolean;
  handleIconClick: () => void;
  handleThumbnailClick: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  thumbnailRef?: React.RefObject<HTMLImageElement>;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  name,
  selected,
  handleIconClick,
  handleThumbnailClick,
  containerRef,
  thumbnailRef,
}) => {
  return (
    <ThumbnailContainer ref={containerRef}>
      <ThumbnailPlaceholder>
        <ThumbnailPicture
          ref={thumbnailRef}
          onClick={handleThumbnailClick}
          src={src}
          onError={(e: React.InvalidEvent<HTMLImageElement>) => {
            e.target.style.display = 'none';
          }}
        />
      </ThumbnailPlaceholder>

      <ThumbnailIconArea onClick={handleIconClick} selected={selected}>
        {selected && <CheckedIcon />}
      </ThumbnailIconArea>

      <ThumbnailNameArea>
        <ThumbnailNameAreaText>{name}</ThumbnailNameAreaText>
      </ThumbnailNameArea>
    </ThumbnailContainer>
  );
};

export default Thumbnail;
