import React from 'react';
import { useField } from 'formik';

interface TextInputProps {
  name: string;
  type: string;
  id: string;
  placeholder: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error &&
        <div>{meta.error}</div>
      }
    </>
  );
};