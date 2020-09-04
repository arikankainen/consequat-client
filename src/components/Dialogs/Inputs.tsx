import React from 'react';
import { useField } from 'formik';
import { Album } from '../../utils/types';
import {
  InputContainer,
  Label,
  DummyInput,
  Input,
  TextArea,
  Select,
  Error,
} from './style';

interface UncontrolledInputProps {
  label: string;
  value: string;
}

export const UncontrolledInput: React.FC<UncontrolledInputProps> = ({
  label,
  value,
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <DummyInput>{value}</DummyInput>
    </InputContainer>
  );
};

interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

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
          error={meta.touched && !!meta.error}
        />
      </InputContainer>
      <Error error={meta.touched && !!meta.error}>{meta.error}</Error>
    </>
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
