import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import EditOneFieldDialog from './EditOneFieldDialog';
import useSaveUser, { SaveUserStatus } from '../../hooks/useSaveUser';

export interface FormValues {
  field: string;
}

const initialValues: FormValues = {
  field: '',
};

const validation = Yup.object({});

export interface EditOneFieldProps {
  open?: boolean;
  topic?: string;
  fieldText?: string;
  defaultValue?: string;
  handleOk?: () => void;
  handleCancel?: () => void;
  validation?: Yup.ObjectSchema<object | undefined>;
}

const EditOneField: React.FC<EditOneFieldProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditOneFieldProps>({});
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
    initialValues.field = savedProps.defaultValue ? savedProps.defaultValue : '';
  }, [savedProps]);

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);

    saveUser.execute({
      email: values.field,
    });
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
      fieldText={savedProps.fieldText}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={props.validation || validation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditOneField;
