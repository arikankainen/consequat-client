import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Photo } from '../utils/types';
import { EDIT_PHOTO, ADD_PHOTO, ME } from '../utils/queries';
import logger from '../utils/logger';

export enum SavePhotoStatus {
  idle,
  saving,
  ready,
  error,
}

interface Return {
  response: SavePhotoResponse;
  execute: (photo: SavePhoto | null | undefined) => void;
  reset: () => void;
}

interface SavePhotoResponse {
  data: Photo | null | undefined;
  status: SavePhotoStatus;
}

interface SavePhoto {
  name: string;
  location?: string | undefined;
  album?: string | undefined | null;
  description?: string;
  id?: string;
  mainUrl?: string;
  thumbUrl?: string;
  filename?: string;
  thumbFilename?: string;
  originalFilename?: string;
}

const initialResponse = {
  data: undefined,
  status: SavePhotoStatus.idle,
};

const useSavePhoto = (): Return => {
  const [response, setResponse] = useState<SavePhotoResponse>(initialResponse);

  const [editPhoto, editPhotoResponse] = useMutation(EDIT_PHOTO, {
    onError: error => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  const [addPhoto, addPhotoResponse] = useMutation(ADD_PHOTO, {
    onError: error => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

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

  useEffect(() => {
    if (addPhotoResponse.data && !addPhotoResponse.error) {
      setResponse({
        data: addPhotoResponse.data.addPhoto,
        status: SavePhotoStatus.ready,
      });
    } else if (addPhotoResponse.error) {
      logger.error(addPhotoResponse.error);

      setResponse({
        data: undefined,
        status: SavePhotoStatus.error,
      });
    }
  }, [addPhotoResponse.data, addPhotoResponse.error]);

  const execute = (photo: SavePhoto | null | undefined) => {
    if (!photo) return;

    setResponse({
      data: undefined,
      status: SavePhotoStatus.saving,
    });

    if (photo.id) {
      editPhoto({
        variables: {
          name: photo.name,
          location: photo.location,
          album: photo.album,
          description: photo.description,
          id: photo.id,
        },
      });
    } else {
      addPhoto({
        variables: {
          mainUrl: photo.mainUrl,
          thumbUrl: photo.thumbUrl,
          filename: photo.filename,
          thumbFilename: photo.thumbFilename,
          originalFilename: photo.originalFilename,
          name: photo.name,
        },
      });
    }
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: SavePhotoStatus.idle,
    });
  };

  return {
    response,
    execute,
    reset,
  };
};

export default useSavePhoto;
