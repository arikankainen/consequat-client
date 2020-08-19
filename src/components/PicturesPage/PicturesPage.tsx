import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { Photo } from '../../utils/types';
import Thumbnail from './Thumbnail';
import { PictureListHeader } from './PictureListHeader';

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

  useEffect(() => {
    if (resultMe.data) {
      setPhotos(resultMe.data.me.photos);
    }
  }, [resultMe.data]);

  return (
    <PictureListContainer>
      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <PictureListToolBarButton>Edit</PictureListToolBarButton>
            <PictureListToolBarButton>Move</PictureListToolBarButton>
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <PictureListToolBarButton>Delete</PictureListToolBarButton>
          </PictureListButtonGroup>
        </PictureListButtonGroups>

      </PictureListToolBar>

      <PictureListHeader name="Uudet kuvat" />
      <PictureListArea count={photos.length}>
        {photos.map(photo =>
          <Thumbnail key={photo.id} photo={photo} />
        )}
      </PictureListArea>

    </PictureListContainer>
  );
};

export default PicturesPage;