import React, { useState } from 'react';
import { useField } from 'formik';
import { Album } from '../../../utils/types';
import { ReactComponent as LockedIcon } from '../../../images/lock-solid_modified.svg';
import { ReactComponent as UnlockedIcon } from '../../../images/unlock-solid.svg';
import { ReactComponent as ShowPasswordIcon } from '../../../images/eye-solid.svg';
import { ReactComponent as HidePasswordIcon } from '../../../images/eye-slash-solid.svg';
import * as Styled from './style';

interface UncontrolledInputProps {
  label: string;
  value: string;
}

export const UncontrolledInput: React.FC<UncontrolledInputProps> = ({
  label,
  value,
}) => {
  return (
    <>
      <Styled.DummyLabel>{label}</Styled.DummyLabel>
      <Styled.InputContainer>
        <Styled.DummyInput>{value}</Styled.DummyInput>
      </Styled.InputContainer>
    </>
  );
};

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onLockClick?: () => void;
  multi?: boolean;
  separator?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  onLockClick,
  multi,
  separator,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      {separator && <Styled.Separator />}
      <Styled.Label htmlFor={props.name}>{label}</Styled.Label>
      <div>
        <Styled.InputContainer>
          <Styled.Input
            type="text"
            autoComplete="off"
            spellCheck={false}
            {...field}
            {...props}
            error={meta.touched && !!meta.error}
          />
          {multi && (
            <Styled.LockContainer
              onClick={onLockClick || (() => void 0)}
              locked={props.disabled}
            >
              {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
            </Styled.LockContainer>
          )}
        </Styled.InputContainer>
        <Styled.Error error={meta.touched && !!meta.error}>
          {meta.error}
        </Styled.Error>
      </div>
    </>
  );
};

export const TextAreaInput: React.FC<TextInputProps> = ({
  label,
  onLockClick,
  multi,
  separator,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      {separator && <Styled.Separator />}
      <Styled.Label htmlFor={props.name}>{label}</Styled.Label>
      <Styled.InputContainer>
        <Styled.TextArea
          autoComplete="off"
          spellCheck={false}
          {...field}
          {...props}
        />
        {multi && (
          <Styled.LockContainer
            onClick={onLockClick || (() => void 0)}
            locked={props.disabled}
          >
            {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
          </Styled.LockContainer>
        )}
      </Styled.InputContainer>
    </>
  );
};

interface SelectInputProps {
  name: string;
  label: string;
  albums: Album[] | undefined;
  disabled?: boolean;
  onLockClick?: () => void;
  multi?: boolean;
  separator?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  onLockClick,
  multi,
  separator,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      {separator && <Styled.Separator />}
      <Styled.Label htmlFor={props.name}>{label}</Styled.Label>
      <Styled.InputContainer>
        <Styled.Select
          autoComplete="off"
          spellCheck={false}
          {...field}
          {...props}
        >
          {props.albums &&
            props.albums.map(album => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
        </Styled.Select>
        {multi && (
          <Styled.LockContainer
            onClick={onLockClick || (() => void 0)}
            locked={props.disabled}
          >
            {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
          </Styled.LockContainer>
        )}
      </Styled.InputContainer>
    </>
  );
};

interface CheckboxInputProps {
  name: string;
  label: string;
  disabled?: boolean;
  onLockClick?: () => void;
  multi?: boolean;
  separator?: boolean;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  onLockClick,
  multi,
  separator,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      {separator && <Styled.Separator />}
      <div />
      <div>
        <Styled.InputContainer>
          <Styled.CheckboxLabel>
            <input
              type="checkbox"
              {...field}
              {...props}
              checked={field.value}
            />
            <span>{label}</span>
          </Styled.CheckboxLabel>
          {multi && (
            <Styled.LockContainer
              onClick={onLockClick || (() => void 0)}
              locked={props.disabled}
            >
              {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
            </Styled.LockContainer>
          )}
        </Styled.InputContainer>
      </div>
    </>
  );
};

export const PasswordInput: React.FC<TextInputProps> = ({
  label,
  separator,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      {separator && <Styled.Separator />}
      <Styled.Label htmlFor={props.name}>{label}</Styled.Label>
      <div>
        <Styled.InputContainer>
          <Styled.Input
            type={show ? 'text' : 'password'}
            autoComplete="off"
            spellCheck={false}
            {...field}
            {...props}
            error={meta.touched && !!meta.error}
          />
          <Styled.LockContainer onClick={() => setShow(!show)} locked={false}>
            {show ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </Styled.LockContainer>
        </Styled.InputContainer>
        <Styled.Error error={meta.touched && !!meta.error}>
          {meta.error}
        </Styled.Error>
      </div>
    </>
  );
};
