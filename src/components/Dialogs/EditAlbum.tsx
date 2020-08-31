import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import logger from '../../utils/logger';
import { EDIT_ALBUM, ME } from '../../utils/queries';
import { Album } from '../../utils/types';
import EditAlbumDialog from './EditAlbumDialog';

export interface FormValues {
  name: string;
  description: string;
}

const initialValues: FormValues = {
  name: '',
  description: '',
};

const validation = Yup.object({});

export interface EditAlbumProps {
  open?: boolean;
  album?: Album;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditAlbum: React.FC<EditAlbumProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditAlbumProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [editAlbum, editAlbumResponse] = useMutation(EDIT_ALBUM, {
    onError: (error) => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  useEffect(() => {
    if (props.open) {
      setSavedProps(props);
      setOpen(true);
      setSaving(false);
      setMessage('');
    } else {
      setOpen(false);
    }
  }, [props]); // eslint-disable-line

  useEffect(() => {
    if (savedProps.album) {
      initialValues.name = savedProps.album.name ? savedProps.album.name : '';
      initialValues.description = savedProps.album.description ? savedProps.album.description : '';
    }
  }, [savedProps]); // eslint-disable-line

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);

    if (savedProps.album) {
      editAlbum({
        variables: {
          name: values.name,
          description: values.description,
          id: savedProps.album.id,
        },
      });
    }
  };

  useEffect(() => {
    if (editAlbumResponse.data && !editAlbumResponse.error) {
      setTimeout(() => {
        setMessage('');
        handleCancel();
      }, 300);
    } else if (editAlbumResponse.error) {
      logger.error(editAlbumResponse);

      setSaving(false);
      setMessage('Error!');
    }
  }, [editAlbumResponse.data, editAlbumResponse.error]); // eslint-disable-line

  return (
    <EditAlbumDialog
      open={open}
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
