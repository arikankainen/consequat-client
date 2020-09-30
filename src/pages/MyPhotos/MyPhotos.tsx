import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { Photo, Album } from '../../utils/types';
import { addPicture } from '../../reducers/pictureReducer';
import EditPhoto, { EditPhotoProps } from '../../components/Dialogs/EditPhoto';
import EditAlbum, { EditAlbumProps } from '../../components/Dialogs/EditAlbum';
import EditTags, { EditTagsProps } from '../../components/Dialogs/EditTags';
import useDeleteQueue, { QueueStatus } from '../../hooks/useDeleteQueue';
import useDeleteAlbum, { DeleteAlbumStatus } from '../../hooks/useDeleteAlbum';
import Confirmation, {
  ConfirmationProps,
} from '../../components/Dialogs/Confirmation';
import { ReactComponent as AddButton } from '../../images/plus-square-solid.svg';
import { ReactComponent as AlbumButton } from '../../images/folder-plus-solid.svg';
import { ReactComponent as DeleteButton } from '../../images/trash-solid.svg';
import { ReactComponent as TagsButton } from '../../images/tag-solid.svg';

import { ReactComponent as EditButton } from '../../images/pen-solid.svg';
import Button from '../../components/Button/Button';
import { ButtonColor } from '../../components/Button/style';
import PhotoAlbum from '../../components/PhotoAlbum/PhotoAlbum';
import { InitialUploadFileButton } from '../../components/InitialUpload/style';
import { PictureListHeader } from '../../components/ListHeaderMyPhotos/ListHeaderMyPhotos';
import Thumbnail from '../../components/Thumbnail/Thumbnail';
import CenteredSpinner from '../../components/SpinnerCentered/CenteredSpinner';

import * as Styled from '../../components/MyPhotosListCommon/style';

const MyPhotos = () => {
  const resultMe = useQuery(ME, {
    fetchPolicy: 'no-cache',
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({});
  const [editPhoto, setEditPhoto] = useState<EditPhotoProps>({});
  const [editAlbum, setEditAlbum] = useState<EditAlbumProps>({});
  const [editTags, setEditTags] = useState<EditTagsProps>({});
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [queueStarted, setQueueStarted] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteQueue = useDeleteQueue();
  const deleteAlbum = useDeleteAlbum();

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
    if (selection.length === photos.length && !allSelected)
      setAllSelected(true);
    else if (selection.length !== photos.length && allSelected)
      setAllSelected(false);
  }, [photos, selection, allSelected]);

  const handleCheckClick = (id: string) => {
    if (selection.includes(id)) {
      setSelection(selection.filter(value => value !== id));
    } else {
      setSelection(selection.concat(id));
    }
  };

  const handleThumbnailClick = (id: string) => {
    if (selection.includes(id)) {
      setSelection(selection.filter(s => s !== id));
    } else {
      setSelection(selection.concat(id));
    }
    // setSelection([id]);
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
      photos: photos.filter(photo => selection.includes(photo.id)),
      albums: albums,
      handleOk: () => void 0,
      handleCancel: () => setEditPhoto({}),
    });
  };

  const handleEditTags = () => {
    setEditTags({
      open: true,
      photos: photos.filter(photo => selection.includes(photo.id)),
      handleOk: () => void 0,
      handleCancel: () => setEditTags({}),
    });
  };

  const handleAddPictures = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file =>
        dispatch(addPicture(file))
      );

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
          handleCancel: () => deleteQueue.abort(),
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
    const status = deleteAlbum.response.status;

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
  }, [deleteAlbum.response.status]);

  const beginDeleteAlbum = (album: Album) => {
    setConfirmation({
      open: true,
      topic: 'Deleting album...',
      text: album.name,
      handleOk: () => void 0,
      disableOk: true,
    });

    deleteAlbum.execute(album);
  };

  const handleDeleteAlbum = (album: Album) => {
    setConfirmation({
      open: true,
      text: 'Really delete album? It will be deleted permanently.',
      handleOk: () => beginDeleteAlbum(album),
      handleCancel: () => setConfirmation({}),
    });
  };

  const isAllSelected = (album: Album) => {
    if (!album) return false;

    const selectedPhotos = album.photos.filter(p => selection.includes(p.id));
    const allSelected = selectedPhotos.length === album.photos.length;

    return allSelected;
  };

  const handleSelectClick = (album: Album) => {
    let currentSelection = selection;

    if (isAllSelected(album)) {
      album.photos.forEach(photo => {
        if (selection.includes(photo.id)) {
          currentSelection = currentSelection.filter(
            value => value !== photo.id
          );
        }
      });
    } else {
      album.photos.forEach(photo => {
        if (!selection.includes(photo.id)) {
          currentSelection = currentSelection.concat(photo.id);
        }
      });
    }

    setSelection(currentSelection);
  };

  // used to automatically open tag editor with 3 photos for testing TODO: remove!
  // useEffect(() => {
  //   if (!photos || photos.length < 3) return;
  //   if (!photos[0].tags) return;
  //   const selectedPhotos = [photos[0].id, photos[1].id, photos[3].id];
  //   setSelection(selectedPhotos);

  //   setEditTags({
  //     open: true,
  //     photos: photos.filter(photo => selectedPhotos.includes(photo.id)),
  //     handleOk: () => void 0,
  //     handleCancel: () => setEditTags({}),
  //   });
  // }, [photos]);

  return (
    <>
      <Styled.PictureListToolBar>
        <Styled.PictureListButtonGroups>
          <Styled.PictureListButtonGroup>
            <form onSubmit={handleSubmit}>
              <Button
                onClick={handleAddPictures}
                text="Add"
                icon={AddButton}
                color={ButtonColor.black}
                breakPoint="480px"
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
              disabled={selection.length === 0}
              color={ButtonColor.black}
              breakPoint="480px"
            />
            <Button
              onClick={handleEditTags}
              text="Tags"
              icon={TagsButton}
              disabled={selection.length === 0}
              color={ButtonColor.black}
              breakPoint="480px"
            />
          </Styled.PictureListButtonGroup>

          <Styled.PictureListButtonGroup>
            <Button
              onClick={handleCreateAlbum}
              text="Create album"
              icon={AlbumButton}
              color={ButtonColor.black}
              breakPoint="380px"
            />
          </Styled.PictureListButtonGroup>

          <Styled.PictureListButtonGroup>
            <Button
              onClick={handleDeletePhotos}
              text="Delete"
              icon={DeleteButton}
              disabled={selection.length === 0}
              color={ButtonColor.black}
              breakPoint="550px"
            />
          </Styled.PictureListButtonGroup>
        </Styled.PictureListButtonGroups>

        <PictureListHeader
          photos={photos}
          albums={albums}
          selection={selection}
        />
      </Styled.PictureListToolBar>

      <Styled.PictureListContainer>
        <Confirmation {...confirmation} />
        <EditPhoto {...editPhoto} />
        <EditTags {...editTags} />
        <EditAlbum {...editAlbum} />
        {resultMe.loading && <CenteredSpinner />}

        {albums.map(album => (
          <PhotoAlbum
            key={album.id}
            name={album.name}
            description={album.description}
            isNotRealAlbum={album.id === '0'}
            isEmpty={album.photos.length === 0}
            editButtonVisible={album.id !== '0'}
            deleteButtonVisible={album.photos.length === 0}
            selectButtonVisible={album.photos.length > 0}
            onEditClick={() => handleEditAlbum(album.id)}
            onDeleteClick={() => handleDeleteAlbum(album)}
            onSelectClick={() => handleSelectClick(album)}
            onOutsideClick={() => setSelection([])}
            selected={isAllSelected(album)}
          >
            <>
              {album.photos.map(photo => (
                <Thumbnail
                  key={photo.id}
                  src={photo.thumbUrl}
                  name={photo.name}
                  hidden={photo.hidden}
                  selected={selection.includes(photo.id)}
                  handleThumbnailClick={() => handleThumbnailClick(photo.id)}
                  handleIconClick={() => handleCheckClick(photo.id)}
                />
              ))}
            </>
          </PhotoAlbum>
        ))}
      </Styled.PictureListContainer>
    </>
  );
};

export default MyPhotos;
