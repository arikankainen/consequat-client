import React from 'react';
import { ReactComponent as CheckedIcon } from 'images/check-solid.svg';
import { ReactComponent as HiddenIcon } from 'images/lock-solid_modified_thumbnail.svg';

import * as Styled from './style';

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
    <Styled.ThumbnailContainer ref={containerRef} selected={selected}>
      <Styled.ThumbnailPlaceholder>
        <Styled.ThumbnailPicture
          ref={thumbnailRef}
          onClick={handleThumbnailClick}
          src={src}
          onError={(e: React.InvalidEvent<HTMLImageElement>) => {
            e.target.style.display = 'none';
          }}
        />
      </Styled.ThumbnailPlaceholder>

      <Styled.ThumbnailSelectIconArea
        onClick={handleIconClick}
        selected={selected}
      >
        {selected && <CheckedIcon />}
      </Styled.ThumbnailSelectIconArea>

      <Styled.ThumbnailHiddenIconArea>
        {hidden && <HiddenIcon />}
      </Styled.ThumbnailHiddenIconArea>

      <Styled.ThumbnailNameArea>
        <Styled.ThumbnailNameAreaText>{name}</Styled.ThumbnailNameAreaText>
      </Styled.ThumbnailNameArea>
    </Styled.ThumbnailContainer>
  );
};

export default Thumbnail;
