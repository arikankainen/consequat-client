import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePhotos } from 'reducers/photoListReducer';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from 'utils/queries';
import { PhotoUserExtended } from 'utils/types';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';
import { useLocation } from 'react-router-dom';

const Photos = () => {
  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS, {
    fetchPolicy: 'network-only',
  });
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [notFound, setNotFound] = useState(false);
  const url = useLocation();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(url.search);

  const keyword = urlParams.get('keyword');
  const name = urlParams.get('name') === 'true';
  const location = urlParams.get('location') === 'true';
  const description = urlParams.get('description') === 'true';
  const tags = urlParams.get('tags') === 'true';

  useEffect(() => {
    const type: string[] = [];
    if (name) type.push('name');
    if (location) type.push('location');
    if (description) type.push('description');
    if (tags) type.push('tags');

    setPhotos([]);
    listPhotos({
      variables: { type, keyword },
    });
  }, [keyword, name, location, description, tags, listPhotos]);

  useEffect(() => {
    const data = resultListPhotos.data;

    if (!data || !data.listPhotos) return;

    if (data.listPhotos.length === 0) setNotFound(true);
    else setNotFound(false);

    setPhotos(data.listPhotos);
    dispatch(updatePhotos(data.listPhotos));
  }, [resultListPhotos.data, dispatch]);

  return (
    <PhotoGrid
      photos={photos}
      search={keyword}
      notFound={notFound}
      loading={resultListPhotos.loading}
    />
  );
};

export default Photos;
