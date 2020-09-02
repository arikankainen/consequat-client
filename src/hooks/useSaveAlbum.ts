import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Album } from '../utils/types';
import { EDIT_ALBUM, CREATE_ALBUM, ME } from '../utils/queries';
import logger from '../utils/logger';

export enum AlbumResponseStatus {
  idle,
  saving,
  ready,
  error,
}

interface AlbumResponse {
  data: Album | null | undefined;
  status: AlbumResponseStatus;
}

interface SaveAlbum {
  name: string;
  description: string | undefined;
  id?: string;
}

const initialResponse = {
  data: undefined,
  status: AlbumResponseStatus.idle,
};

const useSaveAlbum = (): [AlbumResponse, (album: SaveAlbum) => void] => {
  const [response, setResponse] = useState<AlbumResponse>(initialResponse);

  const [editAlbum, editAlbumResponse] = useMutation(EDIT_ALBUM, {
    onError: (error) => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  const [createAlbum, createAlbumResponse] = useMutation(CREATE_ALBUM, {
    onError: (error) => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  const save = (album: SaveAlbum | null | undefined) => {
    if (!album) return;

    setResponse({
      data: undefined,
      status: AlbumResponseStatus.saving,
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

  useEffect(() => {
    if (editAlbumResponse.data && !editAlbumResponse.error) {
      setResponse({
        data: editAlbumResponse.data.editAlbum,
        status: AlbumResponseStatus.ready,
      });
    } else if (editAlbumResponse.error) {
      logger.error(editAlbumResponse.error);

      setResponse({
        data: undefined,
        status: AlbumResponseStatus.error,
      });
    }
  }, [editAlbumResponse.data, editAlbumResponse.error]);

  useEffect(() => {
    if (createAlbumResponse.data && !createAlbumResponse.error) {
      setResponse({
        data: createAlbumResponse.data.editAlbum,
        status: AlbumResponseStatus.ready,
      });
    } else if (createAlbumResponse.error) {
      logger.error(createAlbumResponse.error);

      setResponse({
        data: undefined,
        status: AlbumResponseStatus.error,
      });
    }
  }, [createAlbumResponse.data, createAlbumResponse.error]);

  return [response, save];
};

export default useSaveAlbum;
