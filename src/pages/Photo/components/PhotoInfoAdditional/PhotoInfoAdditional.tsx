import React from 'react';
import { ReactComponent as MapIcon } from 'images/map-marker-alt-solid.svg';
import { ReactComponent as TagIcon } from 'images/tag-solid.svg';
import { ReactComponent as CalendarIcon } from 'images/calendar-alt-solid.svg';
import { ReactComponent as CommentIcon } from 'images/comment-solid.svg';
import Tag from 'pages/Photo/components/Tag/Tag';
import parseDate from 'utils/parseDate';
import * as Styled from './style';

interface PhotoInfoAdditionalProps {
  date: string;
  location: string;
  tags: string[];
  comments: number;
}

const PhotoInfoAdditional: React.FC<PhotoInfoAdditionalProps> = ({
  date,
  location,
  tags,
  comments,
}) => {
  return (
    <>
      {date && date !== '' && (
        <Styled.PropertyWithIcon>
          <CalendarIcon />
          <Styled.TextProperty>{parseDate(date)}</Styled.TextProperty>
        </Styled.PropertyWithIcon>
      )}
      {location && (
        <Styled.PropertyWithIcon>
          <MapIcon />
          <Styled.TextProperty>{location}</Styled.TextProperty>
        </Styled.PropertyWithIcon>
      )}
      {tags && tags.join().trim() !== '' && (
        <Styled.PropertyWithIcon>
          <TagIcon />
          <Styled.TextProperty>
            {tags.map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </Styled.TextProperty>
        </Styled.PropertyWithIcon>
      )}
      <Styled.PropertyWithIcon>
        <CommentIcon />
        {comments === 0 && <>No comments</>}
        {comments === 1 && <>1 comment</>}
        {comments > 1 && <>{comments} comments</>}
      </Styled.PropertyWithIcon>{' '}
    </>
  );
};

export default PhotoInfoAdditional;
