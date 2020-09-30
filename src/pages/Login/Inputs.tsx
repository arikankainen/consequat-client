import React, { useState, useEffect, useRef } from 'react';
import { useField } from 'formik';
import styled, { css } from 'styled-components/macro';
import { ReactComponent as ShowPasswordIcon } from '../../images/eye-solid.svg';
import { ReactComponent as HidePasswordIcon } from '../../images/eye-slash-solid.svg';
import { ReactComponent as InfoIcon } from '../../images/info-circle-solid.svg';

interface LabelProps {
  focus?: boolean;
}

const Label = styled.label<LabelProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  display: block;
  width: 100%;
  color: #666;
  color: var(--accent-color-2);
  font-size: 15px;
  text-align: left;
  font-weight: 500;
  line-height: 1;
  pointer-events: none;
  transition: .2s;
  z-index: 1;

  ${props =>
    props.focus &&
    css`
      font-size: 13px;
      top: 12px;
  `}
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;

  & > svg {
    height: 20px;
    width: 24px;
    color: #555;
  }
`;

interface InputContainerProps {
  focused?: boolean;
  error?: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: var(--input-border-radius);
  cursor: text;

  ${props =>
    props.error &&
    css`
      box-shadow: 0px 0px 1px 1px var(--error-color);
  `};

  ${props =>
    props.focused &&
    css`
      box-shadow: var(--focus);
  `};
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
  margin-top: 12px;
  padding-top: 5px;
  background-color: #fff;
  border: none;
  color: #222;
  font-size: 16px;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;

interface ErrorProps {
  error: boolean;
}

const Error = styled.div<ErrorProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 7px;
  margin-left: 5px;
  color: var(--error-color);
  line-height: 1;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  transition: max-height 0.1s ease, opacity 0.3s ease;

  max-height: 0;
  opacity: 0;

  ${props =>
    props.error &&
    css`
    max-height: 20px;
    margin-bottom: 15px;
    opacity: 1;
  `};

  & > svg {
    margin-bottom: 2px;
    margin-right: 5px;
    height: 16px;
    color: var(--error-color);
  }
`;

const PasswordIcon: React.FC<{ show: boolean }> = ({ show }) => {
  if (show) return <HidePasswordIcon />;
  else return <ShowPasswordIcon />;
};

interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [changed, setChanged] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const handleFocus = () => {
    setFocused(inputRef.current === document.activeElement);
  };

  const handleBlur = () => {
    if (changed) setBlurred(true);
    handleFocus();
  };

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
    handleFocus();
  };

  useEffect(() => {
    handleFocus();
  }, [field, meta]);

  useEffect(() => {
    if (meta.value !== '') setChanged(true);
  }, [meta.value]);

  return (
    <>
      <InputContainer
        focused={focused}
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
        onClick={handleClick}
      >
        <NameContainer>
          <Label htmlFor={props.name} focus={focused || field.value !== ''}>
            {label}
          </Label>
          <Input
            type="text"
            {...field}
            {...props}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            spellCheck={false}
          />
        </NameContainer>
      </InputContainer>
      <Error
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
      >
        <InfoIcon />
        {meta.error}
      </Error>
    </>
  );
};

export const PasswordInput: React.FC<TextInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [changed, setChanged] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const handlePasswordIconClick = () => {
    setShow(!show);
  };

  const handleFocus = () => {
    setFocused(inputRef.current === document.activeElement);
  };

  const handleBlur = () => {
    if (changed) setBlurred(true);
    handleFocus();
  };

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
    handleFocus();
  };

  useEffect(() => {
    handleFocus();
  }, [field, meta]);

  useEffect(() => {
    if (meta.value !== '') setChanged(true);
  }, [meta.value]);

  return (
    <>
      <InputContainer
        focused={focused}
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
        onClick={handleClick}
      >
        <NameContainer>
          <Label htmlFor={props.name} focus={focused || field.value !== ''}>
            {label}
          </Label>
          <Input
            type={show ? 'text' : 'password'}
            {...field}
            {...props}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </NameContainer>
        <Icon onClick={handlePasswordIconClick}>
          <PasswordIcon show={show} />
        </Icon>
      </InputContainer>
      <Error
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
      >
        <InfoIcon />
        {meta.error}
      </Error>
    </>
  );
};
