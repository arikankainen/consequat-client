import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { Photo, Album } from '../../utils/types';
import { addPicture } from '../../reducers/pictureReducer';
import EditPhoto, { EditPhotoProps } from '../Dialogs/EditPhoto';
import EditAlbum, { EditAlbumProps } from '../Dialogs/EditAlbum';
import useDeleteQueue, { QueueStatus } from '../../hooks/useDeleteQueue';
import useDeleteAlbum, { DeleteAlbumStatus } from '../../hooks/useDeleteAlbum';
import Confirmation, { ConfirmationProps } from '../Dialogs/Confirmation';
import { ReactComponent as AddButton } from '../../images/button_add.svg';
import { ReactComponent as AlbumButton } from '../../images/button_album.svg';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import Button, { ButtonColor } from '../Buttons/Button';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import { InitialUploadFileButton } from '../InitialUpload/style';
import { PictureListHeader } from '../PictureListHeader/PictureListHeader';
import Thumbnail from '../Thumbnail/Thumbnail';

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
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [queueStarted, setQueueStarted] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteQueue = useDeleteQueue();
  const [deleteAlbumResponse, deleteAlbum] = useDeleteAlbum();

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
      album: albums.find(album => album.id === id),
      handleOk: () => void 0,
      handleCancel: () => setEditAlbum({}),
    });
  };

  const handleEditPictures = () => {
    setEditPhoto({
      open: true,
      photo: photos.find(photo => photo.id === selection[0]),
      albums: albums,
      handleOk: () => void 0,
      handleCancel: () => setEditPhoto({}),
    });
  };

  const handleAddPictures = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file => dispatch(addPicture(file)));

      history.push('/upload');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!queueStarted) return;

    const status = deleteQueue.response.status;
    const response = deleteQueue.response;
    const text = `Photo ${response.currentFile} of ${response.totalFiles}`;
    const progress = response.progress;

    switch (status) {
      case QueueStatus.running:
        setConfirmation({
          open: true,
          topic: 'Deleting photos...',
          text,
          progress,
          handleOk: () => setConfirmation({}),
          handleCancel: () => deleteQueue.abort(),
          disableOk: true,
          disableCancel: false,
        });
        break;

      case QueueStatus.ready:
        setQueueStarted(false);
        setSelection([]);
        setConfirmation({
          open: true,
          topic: 'Delete completed',
          text: 'All selected photos deleted.',
          progress: 100,
          handleOk: () => setConfirmation({}),
          disableOk: false,
          disableCancel: true,
        });
        break;

      case QueueStatus.error:
        setQueueStarted(false);
        setSelection([]);
        setConfirmation({
          open: true,
          topic: 'Delete failed',
          text: 'An error occurred while deleting.',
          handleOk: () => setConfirmation({}),
          disableOk: false,
          disableCancel: true,
        });
        break;

      case QueueStatus.aborted:
        setQueueStarted(false);
        setSelection([]);
        setConfirmation({
          open: true,
          topic: 'Delete aborted',
          text: 'Deletion was aborted. Some photos may have been deleted.',
          handleOk: () => setConfirmation({}),
          disableOk: false,
          disableCancel: true,
        });
        break;
    }
  }, [deleteQueue.response, queueStarted]); // eslint-disable-line

  const beginDeletePhotos = () => {
    deleteQueue.reset();
    setQueueStarted(true);
    deleteQueue.execute(selection, photos);
  };

  const handleDeletePhotos = () => {
    const count = selection.length;
    const text =
      count === 1
        ? 'Really delete selected photo? It will be deleted permanently.'
        : `Really delete ${count} selected photos? They will be deleted permanently.`;

    setConfirmation({
      open: true,
      text,
      handleOk: beginDeletePhotos,
      handleCancel: () => setConfirmation({}),
    });
  };

  useEffect(() => {
    const status = deleteAlbumResponse.status;

    switch (status) {
      case DeleteAlbumStatus.ready:
        setConfirmation({
          open: true,
          topic: 'Delete completed',
          text: 'Album deleted.',
          handleOk: () => setConfirmation({}),
        });
        break;

      case DeleteAlbumStatus.error:
        setConfirmation({
          open: true,
          topic: 'Delete failed',
          text: 'An error occurred while deleting.',
          handleOk: () => setConfirmation({}),
        });
        break;
    }
  }, [deleteAlbumResponse.status]);

  const beginDeleteAlbum = (album: Album) => {
    setConfirmation({
      open: true,
      topic: 'Deleting album...',
      text: album.name,
      handleOk: () => void 0,
      disableOk: true,
    });

    deleteAlbum(album);
  };

  const handleDeleteAlbum = (album: Album) => {
    setConfirmation({
      open: true,
      text: 'Really delete album? It will be deleted permanently.',
      handleOk: () => beginDeleteAlbum(album),
      handleCancel: () => setConfirmation({}),
    });
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
              onClick={handleDeletePhotos}
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

        {albums.map(album => (
          <PhotoAlbum
            key={album.id}
            name={album.name}
            description={album.description}
            isNotRealAlbum={album.id === '0'}
            isEmpty={album.photos.length === 0}
            editButtonVisible={album.id !== '0'}
            deleteButtonVisible={album.photos.length === 0}
            onEditClick={() => handleEditAlbum(album.id)}
            onDeleteClick={() => handleDeleteAlbum(album)}
          >
            <>
              {album.photos.map(photo => (
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
