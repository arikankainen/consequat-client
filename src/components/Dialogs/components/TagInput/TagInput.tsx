import React from 'react';
import * as Styled from './style';
import Button from 'components/Button/Button';

interface TagInputProps {
  handleTagFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagFieldKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddTag: () => void;
  tagFieldValue: string;
}

const TagInput: React.FC<TagInputProps> = props => {
  return (
    <>
      <Styled.InputContainer>
        <Styled.Input
          type="text"
          autoComplete="off"
          spellCheck={false}
          name="tags"
          onChange={props.handleTagFieldChange}
          onKeyUp={props.handleTagFieldKeyUp}
          value={props.tagFieldValue}
          placeholder="Separate tags by comma"
        />
        <Button
          text="Add new tags"
          onClick={props.handleAddTag}
          margin={[0, 0, 0, 10]}
        />
      </Styled.InputContainer>
    </>
  );
};

export default TagInput;
