import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from '../../utils/queries';
import { PhotoUserExtended } from '../../utils/types';
import PhotoGrid from './PhotoGrid';
import { Loading } from './style';
import { useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import { ReactComponent as NotFoundIcon } from '../../images/not_found.svg';

const PhotosPage = () => {
  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS);
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [notFound, setNotFound] = useState(false);
  const url = useLocation();
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
  }, [resultListPhotos.data]);

  if (resultListPhotos.loading || !photos) return <Loading>Loading...</Loading>;

  if (notFound)
    return (
      <NotFound
        topic="No photos found"
        text="Try different search terms"
        Icon={NotFoundIcon}
      />
    );

  return <PhotoGrid photos={photos} search={keyword} />;
};

export default PhotosPage;
