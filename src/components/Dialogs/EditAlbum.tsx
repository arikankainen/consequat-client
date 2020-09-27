import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Album } from '../../utils/types';
import EditAlbumDialog from './EditAlbumDialog';
import useSaveAlbum, { SaveAlbumStatus } from '../../hooks/useSaveAlbum';

export interface FormValues {
  name: string;
  description: string;
}

const initialValues: FormValues = {
  name: '',
  description: '',
};

const validation = Yup.object({
  name: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Name required'),
});

export interface EditAlbumProps {
  open?: boolean;
  album?: Album | null;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditAlbum: React.FC<EditAlbumProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditAlbumProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const saveAlbum = useSaveAlbum();

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
    if (savedProps.album) {
      initialValues.name = savedProps.album.name ? savedProps.album.name : '';
      initialValues.description = savedProps.album.description
        ? savedProps.album.description
        : '';
    } else {
      initialValues.name = '';
      initialValues.description = '';
    }
  }, [savedProps]);

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setSaving(true);

    if (savedProps.album) {
      saveAlbum.execute({
        name: values.name,
        description: values.description,
        id: savedProps.album.id,
      });
    } else {
      saveAlbum.execute({
        name: values.name,
        description: values.description,
      });
    }
  };

  useEffect(() => {
    if (saveAlbum.response.status === SaveAlbumStatus.ready) {
      setMessage('');
      handleCancel();
    } else if (saveAlbum.response.status === SaveAlbumStatus.error) {
      setMessage('Error!');
      setSaving(false);
    }
  }, [saveAlbum.response.status]); // eslint-disable-line

  return (
    <EditAlbumDialog
      open={open}
      createNew={savedProps.album === null}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={validation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditAlbum;
