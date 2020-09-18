import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import EditOneFieldDialog from './EditCustomFieldsDialog';
import useSaveUser, { SaveUserStatus, SaveUser } from '../../hooks/useSaveUser';

export interface Field {
  type: string;
  name: string;
  label: string;
  initialValue: string;
  validation: Yup.StringSchema<string | undefined>;
}

export interface FormValues {
  [k: string]: string;
}

const initialValues: FormValues = {};
const validation = Yup.object({});

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

  if (props.fields) {
    props.fields.forEach(field => {
      initialValues[field.name] = field.initialValue || '';
    });
  }

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

    setMessage('Saving...');
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
    <EditOneFieldDialog
      open={open}
      topic={savedProps.topic}
      fields={savedProps.fields}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={validation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditCustomFields;
