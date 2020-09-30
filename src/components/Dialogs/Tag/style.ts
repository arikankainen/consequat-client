import styled, { css } from 'styled-components/macro';
import { TagType } from './Tag';

interface TagContainerProps {
  tagType: TagType;
}

export const TagContainer = styled.div<TagContainerProps>`
  display: flex;
  align-items: center;
  padding: 4px 6px 2px 6px;
  margin: 5px;
  font-size: 14px;
  color: #fff;
  line-height: 1;
  border-radius: 3px;
  cursor: default;

  ${props =>
    props.tagType === TagType.added &&
    css`
        background-color: var(--tag-added-color);
  `}

  ${props =>
    props.tagType === TagType.shared &&
    css`
        background-color: var(--tag-shared-color);
  `}

  ${props =>
    props.tagType === TagType.unique &&
    css`
        background-color: var(--tag-unique-color);
  `}
`;

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  cursor: pointer;

  & > svg {
    width: 7px;
    color: #fff;
    margin-left: 5px;
  }
`;
