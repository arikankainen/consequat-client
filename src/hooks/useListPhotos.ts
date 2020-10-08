import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { updatePhotos, updateTotalCount } from 'reducers/photoListReducer';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from 'utils/queries';
import { PhotoUserExtended } from 'utils/types';

interface LastQuery {
  type: string[];
  keyword: string | null;
  offset: number;
  limit: number;
}

interface InputProps {
  type: string[];
  keyword: string | null;
  page: number;
  limit: number;
  preferCached: boolean;
}

const useListPhotos = ({
  type,
  keyword,
  page,
  limit,
  preferCached,
}: InputProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [fetchedFromCache, setFetchedFromCache] = useState(false);

  const [lastQuery, setLastQuery] = useState<LastQuery>({
    type: [],
    keyword: '',
    offset: 0,
    limit: 0,
  });

  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS, {
    fetchPolicy: 'network-only',
  });

  const store = useSelector((state: RootState) => state.photoList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (preferCached && store.photos.length > offset) return;
    if (
      lastQuery.offset === offset &&
      lastQuery.limit === limit &&
      lastQuery.type === type &&
      lastQuery.keyword === keyword
    )
      return;

    const variables = { type, keyword, offset, limit };
    console.log('graphql', variables);

    setLastQuery({ type, keyword, offset, limit });
    listPhotos({ variables });
  }, [
    type,
    keyword,
    offset,
    limit,
    listPhotos,
    store.photos.length,
    preferCached,
    lastQuery,
  ]);

  const fetchFromCache = useCallback(() => {
    if (fetchedFromCache) return;

    setFetchedFromCache(true);
    setPhotos(store.photos);
    setTotalCount(store.totalCount);
  }, [store.photos, store.totalCount, fetchedFromCache]);

  useEffect(() => {
    if (preferCached) fetchFromCache();
  }, [preferCached, fetchFromCache]);

  useEffect(() => {
    setOffset(page * limit);
  }, [page, limit]);

  useEffect(() => {
    if (preferCached && store.photos.length > photos.length) return;
    if (photos.length === 0) return;

    dispatch(updatePhotos(photos));
  }, [photos, preferCached, store.photos.length, dispatch]);

  useEffect(() => {
    setHasMore(photos.length < totalCount);
  }, [photos, totalCount]);

  useEffect(() => {
    const data = resultListPhotos.data;
    if (!data || !data.listPhotos) return;

    setTotalCount(data.listPhotos.totalCount);
    dispatch(updateTotalCount(data.listPhotos.totalCount));
    setPhotos(prevPhotos => {
      return [...prevPhotos, ...data.listPhotos.photos];
    });
  }, [resultListPhotos.data, limit, dispatch]);

  useEffect(() => {
    const error = resultListPhotos.error;
    if (error) {
      setError(true);
    }
  }, [resultListPhotos.error]);

  useEffect(() => {
    setLoading(resultListPhotos.loading);
  }, [resultListPhotos.loading]);

  return { loading, error, photos, hasMore };
};

export default useListPhotos;
