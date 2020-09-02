import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Photo } from '../utils/types';
import { EDIT_PHOTO, ME } from '../utils/queries';
import logger from '../utils/logger';

export enum SavePhotoStatus {
  idle,
  saving,
  ready,
  error,
}

interface SavePhotoResponse {
  data: Photo | null | undefined;
  status: SavePhotoStatus;
}

interface SavePhoto {
  name: string;
  location: string | undefined;
  album: string | undefined | null;
  description: string | undefined;
  id: string;
}

const initialResponse = {
  data: undefined,
  status: SavePhotoStatus.idle,
};

const useSavePhoto = (): [SavePhotoResponse, (photo: SavePhoto) => void] => {
  const [response, setResponse] = useState<SavePhotoResponse>(initialResponse);

  const [editPhoto, editPhotoResponse] = useMutation(EDIT_PHOTO, {
    onError: (error) => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  const save = (photo: SavePhoto | null | undefined) => {
    if (!photo) return;

    setResponse({
      data: undefined,
      status: SavePhotoStatus.saving,
    });

    editPhoto({
      variables: {
        name: photo.name,
        location: photo.location,
        album: photo.album,
        description: photo.description,
        id: photo.id,
      },
    });
  };

  useEffect(() => {
    if (editPhotoResponse.data && !editPhotoResponse.error) {
      setResponse({
        data: editPhotoResponse.data.editPhoto,
        status: SavePhotoStatus.ready,
      });
    } else if (editPhotoResponse.error) {
      logger.error(editPhotoResponse.error);

      setResponse({
        data: undefined,
        status: SavePhotoStatus.error,
      });
    }
  }, [editPhotoResponse.data, editPhotoResponse.error]);

  return [response, save];
};

export default useSavePhoto;
