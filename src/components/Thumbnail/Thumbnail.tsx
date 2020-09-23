import React from 'react';
import { ReactComponent as CheckedIcon } from '../../images/check-solid.svg';
import { ReactComponent as HiddenIcon } from '../../images/lock-solid_modified_thumbnail.svg';

import {
  ThumbnailContainer,
  ThumbnailPlaceholder,
  ThumbnailPicture,
  ThumbnailSelectIconArea,
  ThumbnailHiddenIconArea,
  ThumbnailNameArea,
  ThumbnailNameAreaText,
} from './style';

interface ThumbnailProps {
  src: string;
  name: string;
  selected: boolean;
  hidden: boolean;
  handleIconClick: () => void;
  handleThumbnailClick: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  thumbnailRef?: React.RefObject<HTMLImageElement>;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  name,
  selected,
  hidden,
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

      <ThumbnailSelectIconArea onClick={handleIconClick} selected={selected}>
        {selected && <CheckedIcon />}
      </ThumbnailSelectIconArea>

      <ThumbnailHiddenIconArea>{hidden && <HiddenIcon />}</ThumbnailHiddenIconArea>

      <ThumbnailNameArea>
        <ThumbnailNameAreaText>{name}</ThumbnailNameAreaText>
      </ThumbnailNameArea>
    </ThumbnailContainer>
  );
};

export default Thumbnail;
