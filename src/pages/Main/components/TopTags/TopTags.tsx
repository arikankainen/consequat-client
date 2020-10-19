import React from 'react';
import TopTag from '../TopTag/TopTag';
import useTopTags from 'hooks/useTopTags';
import * as Styled from './style';
import SpinnerCentered from 'components/SpinnerCentered/SpinnerCentered';

const TopTags = () => {
  const topTags = useTopTags({ tags: 10, photosPerTag: 4 });

  if (topTags.loading || !topTags.topTags) return <SpinnerCentered />;

  return (
    <Styled.TopTagsContainer>
      {topTags.topTags.map((topTag, index) => (
        <TopTag
          key={topTag.tag}
          tag={topTag.tag}
          photos={topTag.photos}
          topNumber={index}
          refetching={topTags.refetching}
        />
      ))}
    </Styled.TopTagsContainer>
  );
};

export default TopTags;
