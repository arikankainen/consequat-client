import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 0px 15px;
`;

const Label = styled.label`
  display: block;
  margin-top: 7px;
  width: 100px;
  color: #222;
  font-size: 14px;
  line-height: 1;
`;

const Input = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  color: #222;
  font-size: 14px;
  padding: 2px 6px 0px 6px;

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