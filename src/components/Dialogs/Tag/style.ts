import styled, { css } from 'styled-components/macro';
import { TagType } from './Tag';

interface TagContainerProps {
  tagType: TagType;
}

export const TagContainer = styled.div<TagContainerProps>`
  display: flex;
  align-items: center;
  padding: 4px 0px 2px 6px;
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

  &:hover {
    filter: brightness(1.1);
  }

  transition: all .2s ease;
`;

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  cursor: pointer;

  & > svg {
    width: 7px;
    color: #fff;
    margin-left: 6px;
    margin-right: 6px;
  }
`;
