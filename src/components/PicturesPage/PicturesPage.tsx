import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PHOTO, ME } from '../../utils/queries';
import { Photo } from '../../utils/types';
import Thumbnail from './Thumbnail';
import { PictureListHeader } from './PictureListHeader';
import { storage } from '../../firebase/firebase';
import Confirmation, { ConfirmationProps } from '../ConfirmationDialog/Confirmation';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import { ReactComponent as SelectButton } from '../../images/button_select.svg';
import Button from '../Buttons/Button';

import {
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
  PictureListArea,
} from '../PictureList/Styles';

const PicturesPage = () => {
  const resultMe = useQuery(ME);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({});
  const [deleteInProgress, setDeleteInProgress] = useState<boolean>(false);
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [deletionInProgress, setDeletionInProgress] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const [deletePhotoFromDb] = useMutation(DELETE_PHOTO, {
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: [{ query: ME }]
  });

  useEffect(() => {
    if (resultMe.data) {
      setPhotos(resultMe.data.me.photos);
    }
  }, [resultMe.data]);

  useEffect(() => {
    if (selection.length === photos.length && !allSelected) setAllSelected(true);
    else if (selection.length !== photos.length && allSelected) setAllSelected(false);
  }, [photos, selection]);

  const handleCheckClick = (id: string) => {
    if (selection.includes(id)) {
      setSelection(selection.filter(value => value !== id));
    } else {
      setSelection(selection.concat(id));
    }
  };

  const handleThumbnailClick = (id: string) => {
    setSelection([id]);
  };

  const handleEditPictures = () => {
    console.log('edit', selection);
  };

  const reportProgress = (filename: string, percentage: number) => {
    setConfirmation({
      ...confirmation,
      text: filename,
      progress: percentage,
    });
  };

  const deletePhotoFromFirebase = (filename: string) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(filename);

      storageRef.delete().then(() => {
        console.log('deleted successfully from firebase');
        resolve('ok');
      }).catch(() => {
        console.log('error deleting from firebase');
        reject('error');
      });
    });
  };

  const doDeletion = async (photo: Photo, id: string) => {
    setDeletionInProgress(true);

    try {
      deletePhotoFromDb({ variables: { id } });
    } catch (error) {
      console.log(error);
    }

    await deletePhotoFromFirebase(photo.filename);
    await deletePhotoFromFirebase(photo.thumbFilename);

    setSelection(selection.slice(1));
    setDeletionInProgress(false);
  };

  const startNewDeletion = () => {
    if (selection.length > 0) {
      const id = selection[0];
      const photo = photos.find(photo => photo.id === id);

      if (photo && photo.filename) {
        const percent = Math.round(((deleteCount - selection.length) / deleteCount) * 100);
        reportProgress(`Picture ${deleteCount - selection.length + 1} of ${deleteCount}`, percent);
        doDeletion(photo, id);
      }
    }
  };

  const deleteDone = () => {
    setConfirmation({
      ...confirmation,
      topic: 'Delete completed',
      text: 'All selected files deleted',
      progress: 100,
      handleOk: () => setConfirmation({}),
      disableOk: false,
    });
  };

  useEffect(() => {
    if (deleteInProgress && selection.length > 0) {
      if (!deletionInProgress) startNewDeletion();
    } else if (deleteInProgress && selection.length === 0) {
      setDeleteInProgress(false);
      deleteDone();
    }
  }, [deleteInProgress, deletionInProgress]);

  const handleDeletePicturesConfirmed = () => {
    setConfirmation({
      open: true,
      topic: 'Deleting...',
      text: '...',
      progress: 0,
      handleOk: () => setConfirmation({}),
      disableOk: true,
    });

    setDeleteCount(selection.length);
    setDeleteInProgress(true);
  };

  const handleDeletePictures = () => {
    const count = selection.length;
    const text = count === 1 ?
      'Really delete selected photo?' :
      `Really delete ${count} selected photos?`;

    setConfirmation({
      open: true,
      text,
      handleOk: handleDeletePicturesConfirmed,
      handleCancel: () => setConfirmation({}),
    });
  };

  const handleSelectAll = () => {
    if (!allSelected) {
      const all = photos.map(photo => photo.id);
      setSelection(all);
    } else {
      setSelection([]);
    }
  };

  return (
    <PictureListContainer>
      <Confirmation {...confirmation} />

      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <Button
              onClick={handleEditPictures}
              text="Edit"
              icon={EditButton}
              disabled={selection.length === 0}
            />
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            {!allSelected
              ?
              <Button
                onClick={handleSelectAll}
                text="Select all"
                icon={SelectButton}
                disabled={photos.length === 0}
                textRequired={true}
              />
              :
              <Button
                onClick={handleSelectAll}
                text="Select none"
                icon={SelectButton}
                disabled={photos.length === 0}
                textRequired={true}
              />
            }

          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <Button
              onClick={handleDeletePictures}
              text="Delete"
              icon={DeleteButton}
              disabled={selection.length === 0}
            />
          </PictureListButtonGroup>
        </PictureListButtonGroups>

      </PictureListToolBar>

      {photos.length > 0 && <PictureListHeader name="Uudet kuvat" />}

      <PictureListArea count={photos.length}>
        {photos.map(photo =>
          <Thumbnail
            key={photo.id}
            photo={photo}
            selected={selection.includes(photo.id)}
            handleThumbnailClick={handleThumbnailClick}
            handleCheckClick={handleCheckClick}
          />
        )}
      </PictureListArea>

    </PictureListContainer>
  );
};

export default PicturesPage;