import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Photo, Album } from '../../utils/types';
import EditPhotoDialog from './EditPhotoDialog';
import useSavePhoto, { SavePhotoStatus } from '../../hooks/useSavePhoto';

export interface FormValues {
  name: string;
  location: string;
  album: string;
  description: string;
}

const initialValues: FormValues = {
  name: '',
  location: '',
  album: '',
  description: '',
};

const validation = Yup.object({
  name: Yup.string().min(3, 'Must be at least 3 characters').required('Name required'),
});

export interface EditPhotoProps {
  open?: boolean;
  photo?: Photo;
  albums?: Album[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditPhoto: React.FC<EditPhotoProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [photoResponse, photoSave] = useSavePhoto();

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
    if (savedProps.photo) {
      initialValues.name = savedProps.photo.name ? savedProps.photo.name : '';
      initialValues.location = savedProps.photo.location ? savedProps.photo.location : '';
      initialValues.description = savedProps.photo.description
        ? savedProps.photo.description
        : '';

      if (savedProps.albums && savedProps.photo.album) {
        const albumId = savedProps.photo.album.id;
        const album = savedProps.albums.find((album) => album.id === albumId);
        initialValues.album = album?.id || '';
      } else {
        initialValues.album = '';
      }
    }
  }, [savedProps]); // eslint-disable-line

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);

    if (savedProps.photo) {
      photoSave({
        name: values.name,
        location: values.location,
        album: values.album !== '0' ? values.album : null,
        description: values.description,
        id: savedProps.photo.id,
      });
    }
  };

  useEffect(() => {
    if (photoResponse.status === SavePhotoStatus.ready) {
      setMessage('');
      handleCancel();
    } else if (photoResponse.status === SavePhotoStatus.error) {
      setMessage('Error!');
      setSaving(false);
    }
  }, [photoResponse.status]); // eslint-disable-line

  return (
    <EditPhotoDialog
      open={open}
      dateAdded={savedProps.photo?.dateAdded}
      albums={savedProps.albums}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={validation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditPhoto;
