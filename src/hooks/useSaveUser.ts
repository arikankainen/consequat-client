import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UserToSave } from '../utils/types';
import { EDIT_USER, ME } from '../utils/queries';
import logger from '../utils/logger';

export enum SaveUserStatus {
  idle,
  saving,
  ready,
  error,
}

interface Return {
  response: SaveUserResponse;
  execute: (user: SaveUser) => void;
  reset: () => void;
}

interface SaveUserResponse {
  data: UserToSave | null | undefined;
  status: SaveUserStatus;
}

interface SaveUser {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}

const initialResponse = {
  data: undefined,
  status: SaveUserStatus.idle,
};

const useSaveUser = (): Return => {
  const [response, setResponse] = useState<SaveUserResponse>(initialResponse);

  const [editUser, editUserResponse] = useMutation(EDIT_USER, {
    onError: error => {
      logger.error(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  useEffect(() => {
    if (editUserResponse.data && !editUserResponse.error) {
      setResponse({
        data: editUserResponse.data.editUser,
        status: SaveUserStatus.ready,
      });
    } else if (editUserResponse.error) {
      logger.error(editUserResponse.error);

      setResponse({
        data: undefined,
        status: SaveUserStatus.error,
      });
    }
  }, [editUserResponse.data, editUserResponse.error]);

  const execute = (user: SaveUser | null | undefined) => {
    if (!user) return;

    setResponse({
      data: undefined,
      status: SaveUserStatus.saving,
    });

    editUser({
      variables: {
        email: user.email,
        oldPassword: user.oldPassword,
        newPassword: user.newPassword,
      },
    });
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: SaveUserStatus.idle,
    });
  };

  return { response, execute, reset };
};

export default useSaveUser;
