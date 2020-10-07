import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updatePhotos } from 'reducers/photoListReducer';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';
import { useLocation } from 'react-router-dom';
import useListPhotos from 'hooks/useListPhotos';

const Photos = () => {
  const [keyword, setKeyword] = useState<string | null>('');
  const [type, setType] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const listPhotos = useListPhotos(type, keyword, page);
  const observer = useRef<IntersectionObserver | null>(null);
  const url = useLocation();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(url.search);

  const lastElementRef = useCallback(
    node => {
      if (listPhotos.loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && listPhotos.hasMore) {
          console.log('new page');
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [listPhotos.loading, listPhotos.hasMore]
  );

  const paramKeyword = urlParams.get('keyword');
  const paramName = urlParams.get('name') === 'true';
  const paramLocation = urlParams.get('location') === 'true';
  const paramDescription = urlParams.get('description') === 'true';
  const paramTags = urlParams.get('tags') === 'true';

  useEffect(() => {
    const paramType: string[] = [];
    if (paramName) paramType.push('name');
    if (paramLocation) paramType.push('location');
    if (paramDescription) paramType.push('description');
    if (paramTags) paramType.push('tags');

    setType(paramType);
    setKeyword(paramKeyword);
  }, [paramKeyword, paramName, paramLocation, paramDescription, paramTags]);

  useEffect(() => {
    dispatch(updatePhotos(listPhotos.photos));
  }, [listPhotos.photos, dispatch]);

  return (
    <>
      <PhotoGrid
        photos={listPhotos.photos}
        search={keyword}
        notFound={listPhotos.photos.length === 0}
        loading={listPhotos.loading}
      />
      <div ref={lastElementRef}></div>
    </>
  );
};

export default Photos;
