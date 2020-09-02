import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Album } from '../utils/types';
import { EDIT_ALBUM, CREATE_ALBUM, ME } from '../utils/queries';
import logger from '../utils/logger';

export enum ResponseStatus {
  idle,
  saving,
  ready,
  error,
}

interface Response {
  data: Album | null | undefined;
  status: ResponseStatus;
}

interface SaveAlbum {
  name: string;
  description: string | undefined;
  id?: string;
}

const initialResponse = {
  data: undefined,
  status: ResponseStatus.idle,
};

const useSaveAlbum = (): [Response, (album: SaveAlbum) => void] => {
  const [response, setResponse] = useState<Response>(initialResponse);

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
    setResponse({
      data: undefined,
      status: ResponseStatus.saving,
    });

    if (!album) return;

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
        status: ResponseStatus.ready,
      });
    } else if (editAlbumResponse.error) {
      logger.error(editAlbumResponse.error);

      setResponse({
        data: undefined,
        status: ResponseStatus.error,
      });
    }
  }, [editAlbumResponse.data, editAlbumResponse.error]);

  useEffect(() => {
    if (createAlbumResponse.data && !createAlbumResponse.error) {
      setResponse({
        data: createAlbumResponse.data.editAlbum,
        status: ResponseStatus.ready,
      });
    } else if (createAlbumResponse.error) {
      logger.error(createAlbumResponse.error);

      setResponse({
        data: undefined,
        status: ResponseStatus.error,
      });
    }
  }, [createAlbumResponse.data, createAlbumResponse.error]);

  return [response, save];
};

export default useSaveAlbum;
