import React from 'react';
import { useField } from 'formik';
import { Album } from '../../utils/types';
import { InputContainer, Label, Input, TextArea, Select } from './style';

interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
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
  );
};

interface TextAreaInputProps {
  name: string;
  label: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <InputContainer>
      <Label htmlFor={props.name}>{label}</Label>
      <TextArea autoComplete="off" spellCheck={false} {...field} {...props} />
    </InputContainer>
  );
};

interface SelectInputProps {
  name: string;
  label: string;
  albums: Album[] | undefined;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <InputContainer>
      <Label htmlFor={props.name}>{label}</Label>
      <Select autoComplete="off" spellCheck={false} {...field} {...props}>
        {props.albums &&
          props.albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
      </Select>
    </InputContainer>
  );
};
