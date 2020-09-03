import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Album, User } from '../utils/types';
import { DELETE_ALBUM, ME } from '../utils/queries';
import logger from '../utils/logger';

export enum DeleteAlbumStatus {
  idle,
  deleting,
  ready,
  error,
}

interface DeleteAlbumResponse {
  data: Album | null | undefined;
  status: DeleteAlbumStatus;
}

const initialResponse = {
  data: undefined,
  status: DeleteAlbumStatus.idle,
};

const useDeleteAlbum = (): [DeleteAlbumResponse, (album: Album) => void] => {
  const [response, setResponse] = useState<DeleteAlbumResponse>(initialResponse);

  const [deleteFromDb, deleteFromDbResponse] = useMutation(DELETE_ALBUM, {
    onError: error => {
      logger.error(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const id = response.data.deleteAlbum.id;

          const existingAlbums = existingCache.me.albums;
          const updatedAlbums = existingAlbums.filter(album => album.id !== id);

          const updatedCache = {
            ...existingCache,
            me: {
              ...existingCache.me,
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

  const deleteAlbum = async (album: Album) => {
    if (!album) return;

    setResponse({
      data: undefined,
      status: DeleteAlbumStatus.deleting,
    });

    deleteFromDb({ variables: { id: album.id } });
  };

  useEffect(() => {
    if (deleteFromDbResponse.data && !deleteFromDbResponse.error) {
      setResponse({
        data: deleteFromDbResponse.data.deleteAlbum,
        status: DeleteAlbumStatus.ready,
      });
    } else if (deleteFromDbResponse.error) {
      logger.error(deleteFromDbResponse.error);

      setResponse({
        data: undefined,
        status: DeleteAlbumStatus.error,
      });
    }
  }, [deleteFromDbResponse.data, deleteFromDbResponse.error]);

  return [response, deleteAlbum];
};

export default useDeleteAlbum;
