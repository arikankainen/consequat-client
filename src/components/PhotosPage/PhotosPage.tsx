import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_PHOTOS } from '../../utils/queries';
import { PhotoUserExtended } from '../../utils/types';
import PhotoGrid from './PhotoGrid';

const PhotosPage = () => {
  const { loading, error, data } = useQuery(LIST_PHOTOS);
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);

  console.log(loading);
  console.log(error);
  console.log(data);

  useEffect(() => {
    if (!data || !data.listPhotos) return;
    setPhotos(data.listPhotos);
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return <PhotoGrid photos={photos} />;
};

export default PhotosPage;
