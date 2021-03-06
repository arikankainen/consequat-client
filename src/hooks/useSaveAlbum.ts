import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Album, User } from 'utils/types';
import { EDIT_ALBUM, CREATE_ALBUM, ME } from 'utils/queries';
import logger from 'utils/logger';

export enum SaveAlbumStatus {
  idle,
  saving,
  ready,
  error,
}

interface Return {
  response: SaveAlbumResponse;
  execute: (album: SaveAlbum) => void;
  reset: () => void;
}

interface SaveAlbumResponse {
  data: Album | null | undefined;
  status: SaveAlbumStatus;
}

interface SaveAlbum {
  name: string;
  description: string | undefined;
  id?: string;
}

const initialResponse = {
  data: undefined,
  status: SaveAlbumStatus.idle,
};

const useSaveAlbum = (): Return => {
  const [response, setResponse] = useState<SaveAlbumResponse>(initialResponse);

  const [editAlbum, editAlbumResponse] = useMutation(EDIT_ALBUM, {
    onError: error => {
      logger.error(error);
    },
  });

  const [createAlbum, createAlbumResponse] = useMutation(CREATE_ALBUM, {
    onError: error => {
      logger.error(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const newAlbum = response.data.createAlbum;

          const existingAlbums = existingCache.me.albums;
          const updatedAlbums = existingAlbums.concat(newAlbum);

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

  useEffect(() => {
    if (editAlbumResponse.data && !editAlbumResponse.error) {
      setResponse({
        data: editAlbumResponse.data.editAlbum,
        status: SaveAlbumStatus.ready,
      });
    } else if (editAlbumResponse.error) {
      logger.error(editAlbumResponse.error);

      setResponse({
        data: undefined,
        status: SaveAlbumStatus.error,
      });
    }
  }, [editAlbumResponse.data, editAlbumResponse.error]);

  useEffect(() => {
    if (createAlbumResponse.data && !createAlbumResponse.error) {
      setResponse({
        data: createAlbumResponse.data.createAlbum,
        status: SaveAlbumStatus.ready,
      });
    } else if (createAlbumResponse.error) {
      logger.error(createAlbumResponse.error);

      setResponse({
        data: undefined,
        status: SaveAlbumStatus.error,
      });
    }
  }, [createAlbumResponse.data, createAlbumResponse.error]);

  const execute = (album: SaveAlbum | null | undefined) => {
    if (!album) return;

    setResponse({
      data: undefined,
      status: SaveAlbumStatus.saving,
    });

    if (album.id) {
      editAlbum({
        variables: {
          name: album.name,
          description: album.description,
          id: album.id,
        },
      });
    } else {
      createAlbum({
        variables: {
          name: album.name,
          description: album.description,
        },
      });
    }
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });
  };

  return { response, execute, reset };
};

export default useSaveAlbum;
