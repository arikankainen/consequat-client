import React from 'react';
import { useField } from 'formik';
import { Album } from '../../utils/types';
import { ReactComponent as LockedIcon } from '../../images/icon_locked.svg';
import { ReactComponent as UnlockedIcon } from '../../images/icon_unlocked.svg';

import {
  InputContainer,
  Label,
  DummyInput,
  Input,
  TextArea,
  Select,
  Error,
  LockContainer,
} from './style';

interface UncontrolledInputProps {
  label: string;
  value: string;
}

export const UncontrolledInput: React.FC<UncontrolledInputProps> = ({ label, value }) => {
  return (
    <>
      <Label>{label}</Label>
      <InputContainer>
        <DummyInput>{value}</DummyInput>
      </InputContainer>
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
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  onLockClick,
  multi,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <div>
        <InputContainer>
          <Input
            type="text"
            autoComplete="off"
            spellCheck={false}
            {...field}
            {...props}
            error={meta.touched && !!meta.error}
          />
          {multi && (
            <LockContainer
              onClick={onLockClick || (() => void 0)}
              locked={props.disabled}
            >
              {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
            </LockContainer>
          )}
        </InputContainer>
        <Error error={meta.touched && !!meta.error}>{meta.error}</Error>
      </div>
    </>
  );
};

export const TextAreaInput: React.FC<TextInputProps> = ({
  label,
  onLockClick,
  multi,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <InputContainer>
        <TextArea autoComplete="off" spellCheck={false} {...field} {...props} />
        {multi && (
          <LockContainer onClick={onLockClick || (() => void 0)} locked={props.disabled}>
            {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
          </LockContainer>
        )}
      </InputContainer>
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
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  onLockClick,
  multi,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <InputContainer>
        <Select autoComplete="off" spellCheck={false} {...field} {...props}>
          {props.albums &&
            props.albums.map(album => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
        </Select>
        {multi && (
          <LockContainer onClick={onLockClick || (() => void 0)} locked={props.disabled}>
            {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
          </LockContainer>
        )}
      </InputContainer>
    </>
  );
};

export const PasswordInput: React.FC<TextInputProps> = ({
  label,
  onLockClick,
  multi,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Label htmlFor={props.name}>{label}</Label>
      <div>
        <InputContainer>
          <Input
            type="password"
            autoComplete="off"
            spellCheck={false}
            {...field}
            {...props}
            error={meta.touched && !!meta.error}
          />
          {multi && (
            <LockContainer
              onClick={onLockClick || (() => void 0)}
              locked={props.disabled}
            >
              {props.disabled ? <LockedIcon /> : <UnlockedIcon />}
            </LockContainer>
          )}
        </InputContainer>
        <Error error={meta.touched && !!meta.error}>{meta.error}</Error>
      </div>
    </>
  );
};
