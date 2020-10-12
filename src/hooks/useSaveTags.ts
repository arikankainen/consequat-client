import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Photo } from 'utils/types';
import { EDIT_TAGS } from 'utils/queries';
import logger from 'utils/logger';

export enum SaveTagsStatus {
  idle,
  saving,
  ready,
  error,
}

interface Return {
  response: SaveTagsResponse;
  execute: (photo: SaveTags | null | undefined) => void;
  reset: () => void;
}

interface SaveTagsResponse {
  data: Photo | null | undefined;
  status: SaveTagsStatus;
}

export interface SaveTags {
  addedTags?: string[];
  deletedTags?: string[];
  id?: string[];
}

const initialResponse = {
  data: undefined,
  status: SaveTagsStatus.idle,
};

const useSaveTags = (): Return => {
  const [response, setResponse] = useState<SaveTagsResponse>(initialResponse);

  const [editTags, editTagsResponse] = useMutation(EDIT_TAGS, {
    onError: error => {
      logger.error(error);
    },
  });

  useEffect(() => {
    if (editTagsResponse.data && !editTagsResponse.error) {
      setResponse({
        data: editTagsResponse.data.editPhoto,
        status: SaveTagsStatus.ready,
      });
    } else if (editTagsResponse.error) {
      logger.error(editTagsResponse.error);

      setResponse({
        data: undefined,
        status: SaveTagsStatus.error,
      });
    }
  }, [editTagsResponse.data, editTagsResponse.error]);

  const execute = (photo: SaveTags | null | undefined) => {
    if (!photo) return;

    setResponse({
      data: undefined,
      status: SaveTagsStatus.saving,
    });

    editTags({
      variables: {
        addedTags: photo.addedTags,
        deletedTags: photo.deletedTags,
        id: photo.id,
      },
    });
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: SaveTagsStatus.idle,
    });
  };

  return { response, execute, reset };
};

export default useSaveTags;
