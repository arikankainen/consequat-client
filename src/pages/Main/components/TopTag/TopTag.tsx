import React from 'react';
import { PhotoUserExtended } from 'utils/types';
import getSearchString from 'utils/getSearchString';
import * as Styled from './style';

interface TopTags {
  tag: string;
  photos: PhotoUserExtended[];
  topNumber: number;
}

const TopTag: React.FC<TopTags> = ({ tag, photos, topNumber }) => {
  const tagLink = getSearchString({ search: tag, tags: true });

  return (
    <Styled.TopTagContainer>
      <Styled.TopicArea>
        <Styled.TagLink to={tagLink}>{tag}</Styled.TagLink>
        <Styled.NumberText>Number #{topNumber + 1} tag</Styled.NumberText>
      </Styled.TopicArea>
      {photos.map(photo => (
        <Styled.ThumbnailPlaceholder
          key={photo.id}
          to={`/photos/photo/${photo.id}?prev=${tagLink}`}
        >
          <Styled.ThumbnailPicture src={photo.thumbUrl} />
        </Styled.ThumbnailPlaceholder>
      ))}
    </Styled.TopTagContainer>
  );
};

export default TopTag;
