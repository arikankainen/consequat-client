import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from '../../utils/queries';
import { PhotoUserExtended } from '../../utils/types';
import PhotoGrid from './PhotoGrid';
import { Loading } from './style';
import { useParams } from 'react-router-dom';

const PhotosPage = () => {
  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS);
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const { search } = useParams();

  useEffect(() => {
    listPhotos({
      variables: { search },
    });
  }, [search, listPhotos]);

  useEffect(() => {
    const data = resultListPhotos.data;

    if (!data || !data.listPhotos) return;
    setPhotos(data.listPhotos);
  }, [resultListPhotos.data]);

  if (resultListPhotos.loading) return <Loading>Loading...</Loading>;

  return <PhotoGrid photos={photos} search={search} />;
};

export default PhotosPage;
