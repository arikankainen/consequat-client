import React from 'react';
import { PhotoUserExtended } from 'utils/types';
import getSearchString from 'utils/getSearchString';
import * as Styled from './style';
import Spinner from 'components/Spinner/Spinner';

interface TopTags {
  tag: string;
  photos: PhotoUserExtended[];
  topNumber: number;
  refetching: boolean;
}

const TopTag: React.FC<TopTags> = ({ tag, photos, topNumber, refetching }) => {
  const tagLink = getSearchString({ search: tag, tags: true });
  const customizedSpinner = (
    <Spinner size={12} show={true} color="150, 150, 150" bgcolor="238, 238, 238" />
  );

  return (
    <Styled.TopTagContainer>
      <Styled.TopicArea>
        <Styled.TagLink to={tagLink}>{tag}</Styled.TagLink>
        <Styled.NumberText>#{topNumber + 1} tag</Styled.NumberText>
      </Styled.TopicArea>
      {photos.map(photo => (
        <Styled.ThumbnailPlaceholder
          key={photo.id}
          to={`/photos/photo/${photo.id}?prev=${tagLink}`}
        >
          <Styled.ThumbnailPicture src={photo.thumbUrl} />
        </Styled.ThumbnailPlaceholder>
      ))}
      {refetching && <Styled.Loading>{customizedSpinner}</Styled.Loading>}
    </Styled.TopTagContainer>
  );
};

export default TopTag;
