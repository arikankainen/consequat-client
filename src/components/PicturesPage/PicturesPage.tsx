import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { Photo } from '../../utils/types';
import Thumbnail from './Thumbnail';

import {
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
  PictureListToolBarButton,
  PictureListArea,
} from '../UploadPage/Styles';

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
            <PictureListToolBarButton>Remove</PictureListToolBarButton>
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <PictureListToolBarButton>Move to collection</PictureListToolBarButton>
          </PictureListButtonGroup>
        </PictureListButtonGroups>

      </PictureListToolBar>

      <PictureListArea count={photos.length}>
        {photos.map(photo =>
          <Thumbnail key={photo.id} photo={photo} />
        )}
      </PictureListArea>

    </PictureListContainer>
  );
};

export default PicturesPage;