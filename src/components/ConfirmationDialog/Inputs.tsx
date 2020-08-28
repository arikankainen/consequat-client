import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { Album } from '../../utils/types';

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 0px 5px;
`;

const Label = styled.label`
  display: block;
  margin-top: 7px;
  margin-right: 10px;
  width: 100px;
  color: #000;
  font-size: 14px;
  line-height: 1;
  text-align: right;
  font-weight: 400;
`;

const Input = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  color: #000;
  font-size: 14px;
  padding: 2px 6px 2px 6px;
  line-height: 1;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }
`;

const Select = styled.select`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  color: #111;
  font-size: 14px;
  padding: 2px 2px 2px 2px;
  line-height: 1;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }
`;

const TextArea = styled.textarea`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  min-height: 50px;
  color: #111;
  font-size: 14px;
  padding: 7px 6px;
  line-height: 1.2;
  resize: vertical;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }
`;

interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <InputContainer>
        <Label htmlFor={props.name}>{label}</Label>
        <Input
          type="text"
          autoComplete="off"
          spellCheck={false}
          {...field}
          {...props}
        />
      </InputContainer>
    </>
  );
};

export const TextAreaInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <InputContainer>
        <Label htmlFor={props.name}>{label}</Label>
        <TextArea
          autoComplete="off"
          spellCheck={false}
          {...field}
          {...props}
        />
      </InputContainer>
    </>
  );
};

interface SelectProps {
  name: string;
  label: string;
  albums: Album[] | undefined;
}

export const SelectInput: React.FC<SelectProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <InputContainer>
        <Label htmlFor={props.name}>{label}</Label>
        <Select
          autoComplete="off"
          spellCheck={false}
          {...field}
          {...props}
        >
          {props.albums && props.albums.map(album =>
            <option key={album.id} value={album.id}>{album.name}</option>
          )}

        </Select>
      </InputContainer>
    </>
  );
};