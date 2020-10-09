import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { setPreviousPhoto } from 'reducers/systemReducer';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';
import LoadingMore from './components/LoadingMore/LoadingMore';
import { useLocation } from 'react-router-dom';
import useListPhotos from 'hooks/useListPhotos';

const photosPerPage = 70;

const Photos = () => {
  const systemState = useSelector((state: RootState) => state.system);
  const observer = useRef<IntersectionObserver | null>(null);
  const url = useLocation();
  const urlParams = new URLSearchParams(url.search);
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string | null>(null);
  const [type, setType] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollId, setScrollId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [prevPhotoCleared, setPrevPhotoCleared] = useState(false);

  const listPhotos = useListPhotos({
    type,
    keyword,
    page,
    limit: photosPerPage,
    preferCached: url.search.includes('back=true'),
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
    if (prevPhotoCleared) return;

    setScrollId(systemState.previousPhotoId);
    dispatch(setPreviousPhoto(''));
    setPrevPhotoCleared(true);
  }, [systemState.previousPhotoId, dispatch, prevPhotoCleared]);

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

  const photoListLoaded = () => {
    if (scrolled) return;

    setTimeout(() => {
      if (scrollRef.current && scrollRef.current instanceof HTMLDivElement) {
        scrollRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center',
        });
        setScrolled(true);
      }
    }, 1000);
  };

  return (
    <>
      <PhotoGrid
        photos={listPhotos.photos}
        search={keyword}
        notFound={listPhotos.photos.length === 0}
        loading={listPhotos.loading}
        scrollId={scrollId}
        scrollRef={scrollRef}
        loaded={photoListLoaded}
      />
      <LoadingMore refProp={lastElementRef} loading={listPhotos.loading} />
    </>
  );
};

export default Photos;
