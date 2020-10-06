import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Photo, User } from 'utils/types';
import { DELETE_PHOTO, ME } from 'utils/queries';
import logger from 'utils/logger';
import { storage } from 'utils/firebase/firebase';

export enum DeletePhotoStatus {
  idle,
  deleting,
  ready,
  error,
}

interface Return {
  response: DeletePhotoResponse;
  execute: (photo: Photo) => void;
  reset: () => void;
}

interface DeletePhotoResponse {
  data: Photo | null | undefined;
  status: DeletePhotoStatus;
}

const initialResponse = {
  data: undefined,
  status: DeletePhotoStatus.idle,
};

const useDeletePhoto = (): Return => {
  const [response, setResponse] = useState<DeletePhotoResponse>(
    initialResponse
  );

  const [deleteFromDb, deleteFromDbResponse] = useMutation(DELETE_PHOTO, {
    onError: error => {
      logger.error(error);
      setResponse({
        data: undefined,
        status: DeletePhotoStatus.error,
      });
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const id = response.data.deletePhoto.id;

          const existingPhotos = existingCache.me.photos;
          const updatedPhotos = existingPhotos.filter(p => p.id !== id);

          const existingAlbums = existingCache.me.albums;
          const updatedAlbums = existingAlbums.map(album => {
            const filteredPhotos = album.photos.filter(p => p.id !== id);
            return { ...album, photos: filteredPhotos };
          });

          const updatedCache = {
            ...existingCache,
            me: {
              ...existingCache.me,
              photos: updatedPhotos,
              albums: updatedAlbums,
            },
          };

          cache.writeQuery({
            query: ME,
            data: updatedCache,
          });
        }
      } catch (error) {
        logger.error(error);
      }
    },
  });

  const deleteFromFirebase = (filename: string) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(filename);

      storageRef
        .delete()
        .then(() => {
          resolve('ok');
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (deleteFromDbResponse.data && !deleteFromDbResponse.error) {
      setResponse({
        data: deleteFromDbResponse.data.deletePhoto,
        status: DeletePhotoStatus.ready,
      });
    } else if (deleteFromDbResponse.error) {
      logger.error(deleteFromDbResponse.error);

      setResponse({
        data: undefined,
        status: DeletePhotoStatus.error,
      });
    }
  }, [deleteFromDbResponse.data, deleteFromDbResponse.error]);

  const execute = async (photo: Photo) => {
    if (!photo) return;

    setResponse({
      data: undefined,
      status: DeletePhotoStatus.deleting,
    });

    const allowedError = 'storage/object-not-found';

    try {
      await deleteFromFirebase(photo.filename);
    } catch (error) {
      logger.error(
        `Error deleting ${photo.filename} from firebase: ${error.code}`
      );

      if (error.code !== allowedError) {
        setResponse({
          data: undefined,
          status: DeletePhotoStatus.error,
        });
        return;
      }
    }

    try {
      await deleteFromFirebase(photo.thumbFilename);
    } catch (error) {
      logger.error(
        `Error deleting ${photo.thumbFilename} from firebase: ${error.code}`
      );

      if (error.code !== allowedError) {
        setResponse({
          data: undefined,
          status: DeletePhotoStatus.error,
        });
        return;
      }
    }

    deleteFromDb({ variables: { id: photo.id } });
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: DeletePhotoStatus.idle,
    });
  };

  return { response, execute, reset };
};

export default useDeletePhoto;
