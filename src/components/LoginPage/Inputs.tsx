import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  width: 100%;
  margin-top: 10px;
  color: var(--default-font-color);
  font-size: var(--default-font-size);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--input-bg-color);
  border: none;
  border-radius: var(--input-border-radius);
  color: var(--input-color);
  font-size: var(--default-font-size);
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const Error = styled.div`
  color: #dd4444;
`;

interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <Input type="text" {...field} {...props} />
      {meta.touched && meta.error &&
        <Error>{meta.error}</Error>
      }
    </>
  );
};

export const PasswordInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <Input type="password" {...field} {...props} />
      {meta.touched && meta.error &&
        <Error>{meta.error}</Error>
      }
    </>
  );
};