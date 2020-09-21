import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import EditCustomFieldsDialog from './EditCustomFieldsDialog';
import useSaveUser, { SaveUserStatus, SaveUser } from '../../hooks/useSaveUser';

export interface Field {
  separator?: boolean;
  type: string;
  name: string;
  label: string;
  initialValue?: string;
  validation: Yup.StringSchema<string | undefined>;
}

export interface FormValues {
  [k: string]: string;
}

export interface ValidationSchema {
  [k: string]: Yup.StringSchema<string | undefined>;
}

const initialValues: FormValues = {};
const schema: ValidationSchema = {};
let validationSchema: Yup.ObjectSchema<object | undefined>;

export interface EditCustomFieldsProps {
  open?: boolean;
  topic?: string;
  fields?: Field[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditCustomFields: React.FC<EditCustomFieldsProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditCustomFieldsProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const saveUser = useSaveUser();

  useEffect(() => {
    if (props.open) {
      setSavedProps(props);
      setOpen(true);
      setSaving(false);
      setMessage('');
    } else {
      setOpen(false);
    }
  }, [props]);

  useEffect(() => {
    if (props.fields) {
      props.fields.forEach(field => {
        initialValues[field.name] = field.initialValue || '';
        schema[field.name] = field.validation;
      });
    }

    validationSchema = Yup.object(schema);
  }, [props]);

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    const saveObject: SaveUser = {};

    for (const [key, value] of Object.entries(values)) {
      if (key === 'email' || key === 'oldPassword' || key === 'newPassword') {
        saveObject[key] = value;
      }
    }

    setSaving(true);
    saveUser.execute(saveObject);
  };

  useEffect(() => {
    if (saveUser.response.status === SaveUserStatus.ready) {
      setMessage('');
      handleCancel();
    } else if (saveUser.response.status === SaveUserStatus.error) {
      setMessage('Error!');
      setSaving(false);
    }
  }, [saveUser.response.status]); // eslint-disable-line

  return (
    <EditCustomFieldsDialog
      open={open}
      topic={savedProps.topic}
      fields={savedProps.fields}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={validationSchema}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditCustomFields;
