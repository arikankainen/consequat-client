import React from 'react';
import * as Styled from './style';
import getSearchString from 'utils/getSearchString';

interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  const address = getSearchString({
    tags: true,
    search: tag,
  });

  return <Styled.TagLink to={address}>{tag}</Styled.TagLink>;
};

export default Tag;
