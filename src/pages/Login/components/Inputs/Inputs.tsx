import React, { useState, useEffect, useRef } from 'react';
import { useField } from 'formik';
import { ReactComponent as ShowPasswordIcon } from 'images/eye-solid.svg';
import { ReactComponent as HidePasswordIcon } from 'images/eye-slash-solid.svg';
import { ReactComponent as InfoIcon } from 'images/info-circle-solid.svg';
import * as Styled from './style';

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
      <Styled.InputContainer
        focused={focused}
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
        onClick={handleClick}
      >
        <Styled.NameContainer>
          <Styled.Label
            htmlFor={props.name}
            focus={focused || field.value !== ''}
          >
            {label}
          </Styled.Label>
          <Styled.Input
            type="text"
            {...field}
            {...props}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            spellCheck={false}
          />
        </Styled.NameContainer>
      </Styled.InputContainer>
      <Styled.Error
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
      >
        <InfoIcon />
        {meta.error}
      </Styled.Error>
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
      <Styled.InputContainer
        focused={focused}
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
        onClick={handleClick}
      >
        <Styled.NameContainer>
          <Styled.Label
            htmlFor={props.name}
            focus={focused || field.value !== ''}
          >
            {label}
          </Styled.Label>
          <Styled.Input
            type={show ? 'text' : 'password'}
            {...field}
            {...props}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Styled.NameContainer>
        <Styled.Icon onClick={handlePasswordIconClick}>
          <PasswordIcon show={show} />
        </Styled.Icon>
      </Styled.InputContainer>
      <Styled.Error
        error={
          (meta.touched && !!meta.error) || (changed && blurred && !!meta.error)
        }
      >
        <InfoIcon />
        {meta.error}
      </Styled.Error>
    </>
  );
};
