import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PHOTO, DELETE_ALBUM, ME } from '../../utils/queries';
import { Photo, User, Album } from '../../utils/types';
import Thumbnail from '../Thumbnail/Thumbnail';
import { PictureListHeader } from '../PictureListHeader/PictureListHeader';
import { storage } from '../../firebase/firebase';
import { addPicture } from '../../reducers/pictureReducer';
import Confirmation, { ConfirmationProps } from '../Dialogs/Confirmation';
import { ReactComponent as AddButton } from '../../images/button_add.svg';
import { ReactComponent as AlbumButton } from '../../images/button_album.svg';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import Button, { ButtonColor } from '../Buttons/Button';
import EditPhoto, { EditPhotoProps } from '../Dialogs/EditPhoto';
import EditAlbum, { EditAlbumProps } from '../Dialogs/EditAlbum';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import logger from '../../utils/logger';
import { InitialUploadFileButton } from '../InitialUpload/style';
import useDeleteManyPhotos, { DeletePhotosStatus } from '../../hooks/useDeleteManyPhotos';

import {
  PictureListOuterContainer,
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
} from '../PictureList/style';

const PicturesPage = () => {
  const resultMe = useQuery(ME);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({});
  const [editPhoto, setEditPhoto] = useState<EditPhotoProps>({});
  const [editAlbum, setEditAlbum] = useState<EditAlbumProps>({});
  const [deletionInProgress, setDeletionInProgress] = useState<boolean>(false);
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [singleDeletionInProgress, setsingleDeletionInProgress] = useState<boolean>(
    false
  );
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [deletionError, setDeletionError] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [photoResponse, photoDeleteMany] = useDeleteManyPhotos();

  const [deletePhotoFromDb] = useMutation(DELETE_PHOTO, {
    onError: (error) => {
      logger.error(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const id = response.data.deletePhoto.id;

          const existingPhotos = existingCache.me.photos;
          const updatedPhotos = existingPhotos.filter((p) => p.id !== id);

          const existingAlbums = existingCache.me.albums;
          const updatedAlbums = existingAlbums.map((album) => {
            const filteredPhotos = album.photos.filter((p) => p.id !== id);
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

  const [deleteAlbumFromDb] = useMutation(DELETE_ALBUM, {
    onError: (error) => {
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
          const updatedAlbums = existingAlbums.filter((album) => album.id !== id);

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
    if (resultMe.data) {
      const allPhotos: Photo[] = resultMe.data.me.photos;
      const allAlbums: Album[] = resultMe.data.me.albums;

      const initialAlbum: Album = {
        name: 'Not in album',
        description: 'Photos not belonging to any album yet',
        photos: [],
        id: '0',
      };

      initialAlbum.photos = allPhotos.filter((photo) => photo.album === null);

      setPhotos(allPhotos);
      setAlbums([initialAlbum, ...allAlbums]);
    }
  }, [resultMe.data]);

  useEffect(() => {
    if (selection.length === photos.length && !allSelected) setAllSelected(true);
    else if (selection.length !== photos.length && allSelected) setAllSelected(false);
  }, [photos, selection, allSelected]);

  const handleCheckClick = (id: string) => {
    if (selection.includes(id)) {
      setSelection(selection.filter((value) => value !== id));
    } else {
      setSelection(selection.concat(id));
    }
  };

  const handleThumbnailClick = (id: string) => {
    /*
    if (selection.includes(id)) {
      setSelection(selection.filter(s => s !== id));
    } else {
      setSelection(selection.concat(id));
    }
    */
    setSelection([id]);
  };

  const handleCreateAlbum = () => {
    setEditAlbum({
      open: true,
      album: null,
      handleOk: () => void 0,
      handleCancel: () => setEditAlbum({}),
    });
  };

  const handleEditAlbum = (id: string) => {
    setEditAlbum({
      open: true,
      album: albums.find((album) => album.id === id),
      handleOk: () => void 0,
      handleCancel: () => setEditAlbum({}),
    });
  };

  const handleEditPictures = () => {
    setEditPhoto({
      open: true,
      photo: photos.find((photo) => photo.id === selection[0]),
      albums: albums,
      handleOk: () => void 0,
      handleCancel: () => setEditPhoto({}),
    });
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

      storageRef
        .delete()
        .then(() => {
          resolve('ok');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const doDeletion = async (photo: Photo, id: string) => {
    setsingleDeletionInProgress(true);
    const allowedError = 'storage/object-not-found';
    let errors = false;

    try {
      await deletePhotoFromFirebase(photo.filename);
    } catch (error) {
      logger.error(`Error deleting ${photo.filename} from firebase: ${error.code}`);

      if (error.code !== allowedError) {
        errors = true;
        const message = `Error deleting ${photo.name}`;
        setDeletionError(message);
      }
    }

    if (!errors) {
      try {
        await deletePhotoFromFirebase(photo.thumbFilename);
      } catch (error) {
        logger.error(`Error deleting ${photo.filename} from firebase: ${error.code}`);

        if (error.code !== allowedError) {
          errors = true;
          const message = `Error deleting thumbnail for ${photo.name}`;
          setDeletionError(message);
        }
      }
    }

    if (!errors) {
      try {
        deletePhotoFromDb({ variables: { id } });
      } catch (error) {
        errors = true;

        const message = `Error deleting database entry for ${photo.name}`;
        setDeletionError(message);
      }
    }

    if (!errors) setSelection(selection.slice(1));
    setsingleDeletionInProgress(false);
  };

  const startNewDeletion = () => {
    if (selection.length > 0) {
      const id = selection[0];
      const photo = photos.find((photo) => photo.id === id);

      if (photo && photo.filename) {
        const percent = Math.round(
          ((deleteCount - selection.length) / deleteCount) * 100
        );
        reportProgress(
          `Photo ${deleteCount - selection.length + 1} of ${deleteCount}`,
          percent
        );
        doDeletion(photo, id);
      }
    }
  };

  const deleteDone = () => {
    if (deletionError) {
      setConfirmation({
        ...confirmation,
        topic: 'Delete failed',
        text: deletionError,
        handleOk: () => setConfirmation({}),
        disableOk: false,
      });
    } else {
      setConfirmation({
        ...confirmation,
        topic: 'Delete completed',
        text: 'All selected photos deleted',
        progress: 100,
        handleOk: () => setConfirmation({}),
        disableOk: false,
      });

      setTimeout(() => {
        setConfirmation({});
      }, 1000);
    }
  };

  useEffect(
    () => {
      if (deletionError) {
        setDeletionInProgress(false);
        deleteDone();
      } else if (deletionInProgress && selection.length > 0) {
        if (!singleDeletionInProgress) startNewDeletion();
      } else if (deletionInProgress && selection.length === 0) {
        setDeletionInProgress(false);
        deleteDone();
      }
    },
    /* eslint-disable */
    [deletionInProgress, singleDeletionInProgress, selection.length, deletionError]
  );
  /* eslint-enable */

  const handleDeletePicturesConfirmed = () => {
    setConfirmation({
      open: true,
      topic: 'Deleting...',
      text: '...',
      progress: 0,
      handleOk: () => setConfirmation({}),
      disableOk: true,
    });

    setDeletionError('');
    setDeleteCount(selection.length);
    setDeletionInProgress(true);
  };

  const handleDeletePictures = () => {
    const count = selection.length;
    const text =
      count === 1
        ? 'Really delete selected photo? It will be deleted permanently.'
        : `Really delete ${count} selected photos? They will be deleted permanently.`;

    setConfirmation({
      open: true,
      text,
      handleOk: handleDeletePicturesConfirmed,
      handleCancel: () => setConfirmation({}),
    });
  };

  const handleDeleteAlbumConfirmed = (id: string, name: string) => {
    setConfirmation({
      open: true,
      topic: 'Deleting...',
      text: `Deleting '${name}'`,
      handleOk: () => setConfirmation({}),
      disableOk: true,
    });

    let errors = false;
    try {
      deleteAlbumFromDb({ variables: { id } });
    } catch (error) {
      errors = true;
      logger.error(`Error deleting album '${name}' from database`);
    }

    if (!errors) setConfirmation({});
    else {
      setConfirmation({
        open: true,
        topic: 'Failed',
        text: `Deletion of '${name}' failed`,
        handleOk: () => setConfirmation({}),
        disableOk: false,
      });
    }
  };

  const handleDeleteAlbum = (id: string, name: string) => {
    setConfirmation({
      open: true,
      text: `Really delete album '${name}'? It will be deleted permanently.`,
      handleOk: () => handleDeleteAlbumConfirmed(id, name),
      handleCancel: () => setConfirmation({}),
    });
  };

  const handleAddPictures = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => dispatch(addPicture(file)));

      history.push('/upload');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log(photoResponse);
  }, [photoResponse]);

  const handleTest = () => {
    photoDeleteMany(selection, photos);
  };

  return (
    <PictureListOuterContainer>
      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <form onSubmit={handleSubmit}>
              <Button
                onClick={handleAddPictures}
                text="Add"
                icon={AddButton}
                color={ButtonColor.black}
                breakPoint="400px"
              />
              <InitialUploadFileButton
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                multiple
                accept=".jpg,.jpeg,.png,.gif"
              />
            </form>

            <Button
              onClick={handleEditPictures}
              text="Edit"
              icon={EditButton}
              disabled={selection.length !== 1}
              color={ButtonColor.black}
              breakPoint="400px"
            />
            <Button // TODO: nappi vaan testiä varten
              onClick={handleTest}
              text="DeleteTest"
              icon={DeleteButton}
              color={ButtonColor.black}
              breakPoint="400px"
            />
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <Button
              onClick={handleCreateAlbum}
              text="Create album"
              icon={AlbumButton}
              color={ButtonColor.black}
              breakPoint="320px"
            />
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <Button
              onClick={handleDeletePictures}
              text="Delete"
              icon={DeleteButton}
              disabled={selection.length === 0}
              color={ButtonColor.black}
              breakPoint="450px"
            />
          </PictureListButtonGroup>
        </PictureListButtonGroups>

        <PictureListHeader photos={photos} selection={selection} />
      </PictureListToolBar>

      <PictureListContainer>
        <Confirmation {...confirmation} />
        <EditPhoto {...editPhoto} />
        <EditAlbum {...editAlbum} />

        {albums.map((album) => (
          <PhotoAlbum
            key={album.id}
            name={album.name}
            description={album.description}
            isNotRealAlbum={album.id === '0'}
            isEmpty={album.photos.length === 0}
            editButtonVisible={album.id !== '0'}
            deleteButtonVisible={album.photos.length === 0}
            onEditClick={() => handleEditAlbum(album.id)}
            onDeleteClick={() => handleDeleteAlbum(album.id, album.name)}
          >
            <>
              {album.photos.map((photo) => (
                <Thumbnail
                  key={photo.id}
                  src={photo.thumbUrl}
                  name={photo.name}
                  selected={selection.includes(photo.id)}
                  handleThumbnailClick={() => handleThumbnailClick(photo.id)}
                  handleIconClick={() => handleCheckClick(photo.id)}
                />
              ))}
            </>
          </PhotoAlbum>
        ))}
      </PictureListContainer>
    </PictureListOuterContainer>
  );
};

export default PicturesPage;
