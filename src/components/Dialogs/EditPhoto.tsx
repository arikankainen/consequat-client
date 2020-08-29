import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import logger from '../../utils/logger';
import { EDIT_PHOTO, ME } from '../../utils/queries';
import { Photo, Album } from '../../utils/types';
import EditPhotoDialog from './EditPhotoDialog';

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

const validation = Yup.object({});

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

  const [editPhoto, editPhotoResponse] = useMutation(EDIT_PHOTO, {
    onError: (error) => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  if (props.open && !open) {
    setSavedProps(props);
    setOpen(true);
    setSaving(false);
  } else if (!props.open && open) {
    setOpen(false);
  }

  if (props.photo) {
    initialValues.name = props.photo.name ? props.photo.name : '';
    initialValues.location = props.photo.location ? props.photo.location : '';
    initialValues.description = props.photo.description
      ? props.photo.description
      : '';
    initialValues.album = '';

    if (props.albums && props.photo.album) {
      const albumId = props.photo.album.id;
      const album = props.albums.find((album) => album.id === albumId);
      initialValues.album = album?.id || '';
    }
  }

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);

    if (props.photo) {
      editPhoto({
        variables: {
          name: values.name,
          location: values.location,
          album: values.album !== '0' ? values.album : null,
          description: values.description,
          id: props.photo.id,
        },
      });
    }
  };

  useEffect(() => {
    if (editPhotoResponse.data && !editPhotoResponse.error) {
      setTimeout(() => {
        setMessage('');
        handleCancel();
      }, 300);
    } else if (editPhotoResponse.error) {
      logger.error(editPhotoResponse);

      setSaving(false);
      setMessage('Error!');
    }
  }, [editPhotoResponse.data, editPhotoResponse.error]); // eslint-disable-line

  return (
    <EditPhotoDialog
      open={open}
      albums={props.albums}
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
