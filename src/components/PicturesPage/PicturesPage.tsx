import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PHOTO, ME } from '../../utils/queries';
import { Photo, User, Album } from '../../utils/types';
import Thumbnail from './Thumbnail';
import { PictureListHeader } from './PictureListHeader';
import { storage } from '../../firebase/firebase';
import Confirmation, { ConfirmationProps } from '../ConfirmationDialog/Confirmation';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import { ReactComponent as CheckButton } from '../../images/button_check.svg';
import { ReactComponent as UncheckButton } from '../../images/button_uncheck.svg';
import Button from '../Buttons/Button';
import EditPhoto, { EditPhotoProps } from '../ConfirmationDialog/EditPhoto';
import PhotoAlbum from './PhotoAlbum';
import AlbumContainer from './AlbumContainer';

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
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({});
  const [editPhoto, setEditPhoto] = useState<EditPhotoProps>({});
  const [deletionInProgress, setDeletionInProgress] = useState<boolean>(false);
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [singleDeletionInProgress, setsingleDeletionInProgress] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const [deletePhotoFromDb] = useMutation(DELETE_PHOTO, {
    onError: (error) => {
      console.log(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({ query: ME });
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
            }
          };

          cache.writeQuery({
            query: ME,
            data: updatedCache
          });
        }

      } catch (error) {
        console.log(error);
      }
    }
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

      initialAlbum.photos = allPhotos.filter(photo => photo.album === null);

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
      setSelection(selection.filter(value => value !== id));
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

  const handleEditPictures = () => {
    setEditPhoto({
      open: true,
      photo: photos.find(photo => photo.id === selection[0]),
      albums: albums,
      handleOk: () => console.log('ok'),
      handleCancel: () => setEditPhoto({})
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

      storageRef.delete().then(() => {
        resolve('ok');
      }).catch(() => {
        console.log('error deleting from firebase');
        reject('error');
      });
    });
  };

  const doDeletion = async (photo: Photo, id: string) => {
    setsingleDeletionInProgress(true);

    try {
      deletePhotoFromDb({ variables: { id } });
    } catch (error) {
      console.log(error);
    }

    await deletePhotoFromFirebase(photo.filename);
    await deletePhotoFromFirebase(photo.thumbFilename);

    setSelection(selection.slice(1));
    setsingleDeletionInProgress(false);
  };

  const startNewDeletion = () => {
    if (selection.length > 0) {
      const id = selection[0];
      const photo = photos.find(photo => photo.id === id);

      if (photo && photo.filename) {
        const percent = Math.round(((deleteCount - selection.length) / deleteCount) * 100);
        reportProgress(`Photo ${deleteCount - selection.length + 1} of ${deleteCount}`, percent);
        doDeletion(photo, id);
      }
    }
  };

  const deleteDone = () => {
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
  };

  useEffect(() => {
    if (deletionInProgress && selection.length > 0) {
      if (!singleDeletionInProgress) startNewDeletion();
    } else if (deletionInProgress && selection.length === 0) {
      setDeletionInProgress(false);
      deleteDone();
    }
  }, [deletionInProgress, singleDeletionInProgress, selection.length]); // eslint-disable-line

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
    setDeletionInProgress(true);
  };

  const handleDeletePictures = () => {
    const count = selection.length;
    const text = count === 1 ?
      'Really delete selected photo? It will be deleted permanently.' :
      `Really delete ${count} selected photos? They will be deleted permanently.`;

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
      <EditPhoto {...editPhoto} />

      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <Button
              onClick={handleEditPictures}
              text="Edit"
              icon={EditButton}
              disabled={selection.length !== 1}
            />
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            {!allSelected
              ?
              <Button
                onClick={handleSelectAll}
                text="All"
                icon={CheckButton}
                disabled={photos.length === 0}
                textRequired={true}
              />
              :
              <Button
                onClick={handleSelectAll}
                text="All"
                icon={UncheckButton}
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

        {photos.length > 0 &&
          <PictureListHeader photos={photos} selection={selection} />
        }
      </PictureListToolBar>

      {albums.map(album =>
        <AlbumContainer key={album.id}>
          <PhotoAlbum
            name={album.name}
            description={album.description}
            onClick={() => console.log('click')}
          />
          <PictureListArea count={album.photos.length}>
            {album.photos.map(photo =>
              <Thumbnail
                key={photo.id}
                photo={photo}
                selected={selection.includes(photo.id)}
                handleThumbnailClick={handleThumbnailClick}
                handleCheckClick={handleCheckClick}
              />
            )}
          </PictureListArea>
        </AlbumContainer>
      )}

    </PictureListContainer>
  );
};

export default PicturesPage;