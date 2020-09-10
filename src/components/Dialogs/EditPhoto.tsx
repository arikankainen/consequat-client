import React, { useState, useEffect } from 'react';
import { Photo, Album } from '../../utils/types';
import EditPhotoDialog from './EditPhotoDialog';
import useSavePhoto, { SavePhotoStatus, SavePhoto } from '../../hooks/useSavePhoto';
import { getUniqueValue, multiValue, uniqueList } from '../../utils/arrayHelpers';

export interface FormValues {
  name: string;
  nameLocked?: boolean;
  location: string;
  locationLocked?: boolean;
  album: string;
  albumLocked?: boolean;
  description: string;
  descriptionLocked?: boolean;
  tags: string;
  tagsLocked?: boolean;
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
  tags: '',
  tagsLocked: true,
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
  photos?: Photo[];
  albums?: Album[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditPhoto: React.FC<EditPhotoProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [multi, setMulti] = useState(false);
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
    if (savedProps.photos && savedProps.photos.length > 1) setMulti(true);
    else setMulti(false);

    if (savedProps.photos) {
      const photos = savedProps.photos;

      const names = uniqueList(photos.map(photo => photo.name));
      const locations = uniqueList(photos.map(photo => photo.location));
      const descriptions = uniqueList(photos.map(photo => photo.description));
      const tags = uniqueList(photos.map(photo => photo.tags.join(', ')));
      const albums = uniqueList(
        photos.map(photo => (photo.album ? photo.album.id : '0'))
      );

      initialValues.name = getUniqueValue(names);
      initialValues.location = getUniqueValue(locations);
      initialValues.description = getUniqueValue(descriptions);
      initialValues.tags = getUniqueValue(tags);

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
      initialValues.tagsLocked = multiValue(tags);
      initialValues.albumLocked = multiValue(albums);
    }
  }, [savedProps]); // eslint-disable-line

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);
    if (savedProps.photos) {
      const ids = savedProps.photos.map(photo => photo.id);

      if (!multi) {
        savePhoto.execute({
          name: values.name,
          location: values.location,
          album: values.album !== '0' && values.album !== '' ? values.album : null,
          description: values.description,
          tags: values.tags.split(',').map(tag => tag.trim()),
          id: ids,
        });
      } else {
        const unlockedValues: SavePhoto = { id: ids };
        if (!values.nameLocked) unlockedValues.name = values.name;
        if (!values.locationLocked) unlockedValues.location = values.location;
        if (!values.descriptionLocked) unlockedValues.description = values.description;
        if (!values.tagsLocked)
          unlockedValues.tags = values.tags.split(',').map(tag => tag.trim());
        if (!values.albumLocked)
          unlockedValues.album =
            values.album !== '0' && values.album !== '' ? values.album : null;

        savePhoto.execute(unlockedValues);
      }
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
      dateAdded={savedProps.photos && savedProps.photos[0].dateAdded}
      albums={savedProps.albums}
      message={message}
      saving={saving}
      initialValues={initialValues}
      validation={validation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      multi={multi}
    />
  );
};

export default EditPhoto;
