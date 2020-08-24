import React, { useState } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { ReactComponent as ShowPasswordIcon } from '../../images/password_show.svg'
import { ReactComponent as HidePasswordIcon } from '../../images/password_hide.svg'

const Label = styled.label`
  display: block;
  width: 100%;
  color: #666;
  font-size: 13px;
  text-align: left;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  & > svg {
    height: 20px;
    width: 24px;
    color: #444;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eee;
  border: none;
  border-radius: var(--input-border-radius);
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 25px;
  padding-top: 5px;
  background-color: #eee;
  border: none;
  color: #222;
  font-size: 16px;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;

const Error = styled.div`
  color: #dd4444;
`;

const PasswordIcon: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <>
      {show ? <HidePasswordIcon /> : <ShowPasswordIcon />}
    </>
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
        <NameContainer>
          <Label htmlFor={props.name}>{label}</Label>
          <Input type="text" {...field} {...props} />
        </NameContainer>
      </InputContainer>
      {meta.touched && meta.error &&
        <Error>{meta.error}</Error>
      }
    </>
  );
};

export const PasswordInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState<boolean>(false);

  const handlePasswordIconClick = () => {
    setShow(!show);
  };

  return (
    <>
      <InputContainer>
        <NameContainer>
          <Label htmlFor={props.name}>{label}</Label>
          <Input type={show ? 'text' : 'password'} {...field} {...props} />
        </NameContainer>
        <Icon onClick={handlePasswordIconClick}>
          <PasswordIcon show={show} />
        </Icon>
      </InputContainer>
      {meta.touched && meta.error &&
        <Error>{meta.error}</Error>
      }
    </>
  );
};