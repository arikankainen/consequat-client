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
  nameLocked: boolean;
  locationLocked: boolean;
  albumLocked: boolean;
  descriptionLocked: boolean;
}

const initialValues: FormValues = {
  name: '',
  location: '',
  album: '',
  description: '',
  nameLocked: false,
  locationLocked: false,
  albumLocked: false,
  descriptionLocked: false,
};

const validation = Yup.object({
  //name: Yup.string().min(3, 'Must be at least 3 characters').required('Name required'),
});

export interface EditPhotoProps {
  open?: boolean;
  photos?: Photo[];
  albums?: Album[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

interface FieldValues {
  names?: string[];
  locations?: string[];
  descriptions?: string[];
  albums?: string[];
}

const EditPhoto: React.FC<EditPhotoProps> = props => {
  const [open, setOpen] = useState(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const savePhoto = useSavePhoto();
  const [fieldValues, setFieldValues] = useState<FieldValues>({});

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
    const uniqueList = (list: string[]) => {
      return Array.from(new Set(list));
    };

    const firstValue = (list: string[]) => {
      return list.length === 1 ? list[0] : '';
    };

    const multiValue = (list: string[]) => {
      return list.length > 1;
    };

    if (savedProps.photos) {
      const photos = savedProps.photos;

      const names = uniqueList(photos.map(photo => photo.name));
      const locations = uniqueList(photos.map(photo => photo.location));
      const descriptions = uniqueList(photos.map(photo => photo.description));
      const albums = uniqueList(
        photos.map(photo => (photo.album ? photo.album.id : '0'))
      );

      setFieldValues({
        names,
        locations,
        descriptions,
        albums,
      });

      initialValues.name = firstValue(names);
      initialValues.location = firstValue(locations);
      initialValues.description = firstValue(descriptions);

      if (savedProps.albums && albums.length === 1) {
        const albumId = albums[0];
        const album = savedProps.albums.find(album => album.id === albumId);
        initialValues.album = album?.id || '';
      } else {
        initialValues.album = '';
      }

      initialValues.nameLocked = multiValue(names);
      initialValues.locationLocked = multiValue(locations);
      initialValues.descriptionLocked = multiValue(descriptions);
      initialValues.albumLocked = multiValue(albums);
    }
  }, [savedProps]); // eslint-disable-line

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);
    console.log(values);

    /*
    if (savedProps.photos) {
      savePhoto.execute({
        name: values.name,
        location: values.location,
        album: values.album !== '0' ? values.album : null,
        description: values.description,
        id: savedProps.photos.id,
      });
    }
    */
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
      //dateAdded={savedProps.photos?.dateAdded}
      dateAdded={new Date()}
      albums={savedProps.albums}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={validation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      multi={savedProps.photos && savedProps.photos.length > 1}
    />
  );
};

export default EditPhoto;
