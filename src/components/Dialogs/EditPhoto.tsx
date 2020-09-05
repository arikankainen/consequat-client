import React, { useState, useEffect } from 'react';
import { Photo, Album } from '../../utils/types';
import EditPhotoDialog from './EditPhotoDialog';
import useSavePhoto, { SavePhotoStatus } from '../../hooks/useSavePhoto';

export interface FormValues {
  name: string;
  nameLocked?: boolean;
  location: string;
  locationLocked?: boolean;
  album: string;
  albumLocked?: boolean;
  description: string;
  descriptionLocked?: boolean;
}

const initialValues: FormValues = {
  name: '',
  nameLocked: true,
  location: '',
  locationLocked: true,
  album: '',
  albumLocked: true,
  description: '',
  descriptionLocked: true,
};

export interface Errors {
  name?: string;
  nameLocked?: boolean;
}

const validation = (values: FormValues) => {
  const errors: Errors = {};

  if (!values.nameLocked) {
    if (!values.name) errors.name = 'Name required';
    else if (values.name.length < 3) errors.name = 'Must be at least 3 characters';
  }

  return errors;
};

export interface EditPhotoProps {
  open?: boolean;
  photo?: Photo;
  albums?: Album[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditPhoto: React.FC<EditPhotoProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const savePhoto = useSavePhoto();

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
        const album = savedProps.albums.find(album => album.id === albumId);
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
      savePhoto.execute({
        name: values.name,
        location: values.location,
        album: values.album !== '0' ? values.album : null,
        description: values.description,
        id: savedProps.photo.id,
      });
    }
  };

  useEffect(() => {
    if (savePhoto.response.status === SavePhotoStatus.ready) {
      setMessage('');
      handleCancel();
    } else if (savePhoto.response.status === SavePhotoStatus.error) {
      setMessage('Error!');
      setSaving(false);
    }
  }, [savePhoto.response.status]); // eslint-disable-line

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
      multi={true}
    />
  );
};

export default EditPhoto;
