import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { Photo } from '../../utils/types';
import Thumbnail from './Thumbnail';

const PicturesPage = () => {
  const resultMe = useQuery(ME);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (resultMe.data) {
      setPhotos(resultMe.data.me.photos);
    }
  }, [resultMe.data]);

  return (
    <div>
      {photos.map(photo => <Thumbnail key={photo.id} photo={photo} />)}
    </div>
  );
};

export default PicturesPage;