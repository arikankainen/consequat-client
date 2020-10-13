import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPreviousPhoto } from 'reducers/systemReducer';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';
import LoadingMore from './components/LoadingMore/LoadingMore';
import useListPhotos from 'hooks/useListPhotos';

const photosPerPage = 70;

const Photos = () => {
  const systemState = useSelector((state: RootState) => state.system);
  const observer = useRef<IntersectionObserver | null>(null);
  const previousPhotoRef = useRef<HTMLDivElement>(null);
  const url = useLocation();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(url.search);

  const [keyword, setKeyword] = useState<string | null>(null);
  const [type, setType] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [previousPhotoId, setPreviousPhotoId] = useState<string | null>(null);
  const [scrolledIntoView, setScrolledIntoView] = useState(false);
  const [previousPhotoCleared, setPreviousPhotoCleared] = useState(false);
  const [preferCachedPhotoList] = useState(!!systemState.previousPhotoId);

  const listPhotos = useListPhotos({
    type,
    keyword,
    page,
    limit: photosPerPage,
    preferCached: preferCachedPhotoList,
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (listPhotos.loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (
          entries[0].isIntersecting &&
          listPhotos.hasMore &&
          window.scrollY > 0
        ) {
          setPage(Math.ceil(listPhotos.photos.length / photosPerPage));
        }
      });

      if (node) observer.current.observe(node);
    },
    [listPhotos.loading, listPhotos.hasMore, listPhotos.photos]
  );

  useEffect(() => {
    if (previousPhotoCleared) return;

    setPreviousPhotoId(systemState.previousPhotoId);
    dispatch(setPreviousPhoto(''));
    setPreviousPhotoCleared(true);
  }, [systemState.previousPhotoId, dispatch, previousPhotoCleared]);

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

  const handlePhotoListLoaded = () => {
    if (scrolledIntoView) return;

    setTimeout(() => {
      if (
        previousPhotoRef.current &&
        previousPhotoRef.current instanceof HTMLDivElement
      ) {
        previousPhotoRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center',
        });
        setScrolledIntoView(true);
      }
    }, 1000);
  };

  return (
    <>
      <PhotoGrid
        photos={listPhotos.photos}
        search={keyword}
        loading={listPhotos.loading}
        previousPhotoId={previousPhotoId}
        previousPhotoRef={previousPhotoRef}
        totalPhotos={listPhotos.totalCount}
        photoListLoaded={handlePhotoListLoaded}
      />
      <LoadingMore
        refProp={lastElementRef}
        loading={listPhotos.loading && listPhotos.photos.length > 0}
      />
    </>
  );
};

export default Photos;
