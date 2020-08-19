import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PHOTO, ME } from '../../utils/queries';
import { Photo } from '../../utils/types';
import Thumbnail from './Thumbnail';
import { PictureListHeader } from './PictureListHeader';
import { storage } from '../../firebase/firebase';

import {
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
  PictureListToolBarButton,
  PictureListArea,
} from '../PictureList/Styles';

const PicturesPage = () => {
  const resultMe = useQuery(ME);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selection, setSelection] = useState<string[]>([]);

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

  const deletePhotoFromFirebase = (filename: string) => {
    const storageRef = storage.ref(filename);

    storageRef.delete().then(() => {
      console.log('deleted successfully from firebase');
    }).catch(() => {
      console.log('error deleting from firebase');
    });
  };

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

  const handleMovePictures = () => {
    console.log('move', selection);
  };

  const handleDeletePictures = () => {
    selection.forEach(id => {
      const photo = photos.find(photo => photo.id === id);

      if (photo) {
        try {
          deletePhotoFromDb({ variables: { id } });
        } catch (error) {
          console.log(error);
        }

        deletePhotoFromFirebase(photo.filename);
        deletePhotoFromFirebase(photo.thumbFilename);
      }
    });

    setSelection([]);
  };

  return (
    <PictureListContainer>
      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <PictureListToolBarButton
              onClick={handleEditPictures}
              disabled={selection.length === 0}
            >
              Edit
            </PictureListToolBarButton>
            <PictureListToolBarButton
              onClick={handleMovePictures}
              disabled={selection.length === 0}
            >
              Move
            </PictureListToolBarButton>
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <PictureListToolBarButton
              onClick={handleDeletePictures}
              disabled={selection.length === 0}
            >
              Delete
            </PictureListToolBarButton>
          </PictureListButtonGroup>
        </PictureListButtonGroups>

      </PictureListToolBar>

      <PictureListHeader name="Uudet kuvat" />
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