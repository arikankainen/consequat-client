import React from 'react';
import BaseDialog from './BaseDialog/BaseDialog';
import Button from '../Button/Button';
import { ButtonColor } from '../Button/style';
import Spinner from '../Spinner/Spinner';
import * as Styled from './style';
import TagInput from './TagInput/TagInput';
import Tag, { TagType } from './Tag/Tag';
import TagLegend from './TagLegend/TagLegend';

export interface EditTagsDialogProps {
  open: boolean;
  message: string;
  saving: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleTagFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagFieldKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddTag: () => void;
  handleDeleteTag: (text: string, tagType: TagType) => void;
  tagFieldValue: string;
  sharedTags: string[];
  uniqueTags: string[];
  addedTags: string[];
}

const EditTagsDialog: React.FC<EditTagsDialogProps> = props => {
  return (
    <BaseDialog open={props.open}>
      <Styled.DialogContainer>
        <Styled.DialogTopic>Edit tags</Styled.DialogTopic>

        <Styled.DialogContentNormal>
          <Styled.DialogPadding>
            <TagLegend />
            <TagInput
              handleTagFieldChange={props.handleTagFieldChange}
              handleTagFieldKeyUp={props.handleTagFieldKeyUp}
              handleAddTag={props.handleAddTag}
              tagFieldValue={props.tagFieldValue}
            />
            <Styled.TagsContainer>
              {props.uniqueTags.map(tag => (
                <Tag
                  key={tag}
                  text={tag}
                  tagType={TagType.unique}
                  onTagDeleteClick={props.handleDeleteTag}
                />
              ))}
              {props.sharedTags.map(tag => (
                <Tag
                  key={tag}
                  text={tag}
                  tagType={TagType.shared}
                  onTagDeleteClick={props.handleDeleteTag}
                />
              ))}
              {props.addedTags.map(tag => (
                <Tag
                  key={tag}
                  text={tag}
                  tagType={TagType.added}
                  onTagDeleteClick={props.handleDeleteTag}
                />
              ))}
            </Styled.TagsContainer>
          </Styled.DialogPadding>
        </Styled.DialogContentNormal>

        <Styled.DialogButtonArea>
          <Styled.SpinnerContainer>
            <Spinner show={props.saving} />
          </Styled.SpinnerContainer>
          <Styled.SavingIndicator>{props.message}</Styled.SavingIndicator>
          <Button
            text="Cancel"
            width={75}
            color={ButtonColor.whiteWithBlueBorder}
            onClick={props.handleCancel}
          />
          <Button
            text={props.saving ? 'Saving...' : 'Save'}
            width={75}
            disabled={props.saving}
            onClick={props.handleSubmit}
          />
        </Styled.DialogButtonArea>
      </Styled.DialogContainer>
    </BaseDialog>
  );
};

export default EditTagsDialog;
