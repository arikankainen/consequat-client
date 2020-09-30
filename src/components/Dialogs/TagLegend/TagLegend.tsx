import React from 'react';
import * as Styled from './style';

const TagLegend = () => {
  return (
    <Styled.TagLegendContainer>
      Tags colored with <Styled.LegendUnique>grey</Styled.LegendUnique> means
      that some of the selected photos contains that tag. If tag is{' '}
      <Styled.LegendShared>orange</Styled.LegendShared>, it means that all
      selected photos contains that tag.{' '}
      <Styled.LegendAdded>Blue</Styled.LegendAdded> tags are the tags you just
      added.
    </Styled.TagLegendContainer>
  );
};

export default TagLegend;
