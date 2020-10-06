import React from 'react';
import { ReactComponent as DeleteIcon } from 'images/times-solid.svg';
import * as Styled from './style';

export enum TagType {
  unique,
  shared,
  added,
}

export interface TagProps {
  text: string;
  tagType: TagType;
  onTagDeleteClick?: (text: string, tagType: TagType) => void;
}

const Tag: React.FC<TagProps> = ({ text, tagType, onTagDeleteClick }) => {
  return (
    <Styled.TagContainer tagType={tagType}>
      {text}
      {onTagDeleteClick && (
        <Styled.DeleteButton onClick={() => onTagDeleteClick(text, tagType)}>
          <DeleteIcon />
        </Styled.DeleteButton>
      )}
    </Styled.TagContainer>
  );
};

export default Tag;
