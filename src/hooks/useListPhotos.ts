import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePhotos } from 'reducers/photoListReducer';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from 'utils/queries';
import { PhotoUserExtended } from 'utils/types';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  //console.log(preferCached);

  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const variables = { type, keyword, offset, limit };
    listPhotos({ variables });
  }, [type, keyword, offset, limit, listPhotos]);

  useEffect(() => {
    setOffset(page * limit);
  }, [page, limit]);

  useEffect(() => {
    dispatch(updatePhotos(photos));
  }, [photos, dispatch]);

  useEffect(() => {
    const data = resultListPhotos.data;
    const loading = resultListPhotos.loading;
    if (!data || !data.listPhotos || loading) return;

    setTotalCount(data.listPhotos.totalCount);
    setPhotos(prevPhotos => {
      return [...prevPhotos, ...data.listPhotos.photos];
    });
  }, [resultListPhotos.data, resultListPhotos.loading]);

  useEffect(() => {
    setHasMore(photos.length < totalCount);
  }, [photos, totalCount]);

  useEffect(() => {
    const error = resultListPhotos.error;
    if (!error) return;
    setError(true);
  }, [resultListPhotos.error]);

  useEffect(() => {
    setLoading(resultListPhotos.loading);
  }, [resultListPhotos.loading]);

  return { loading, totalCount, error, photos, hasMore };
};

export default useListPhotos;
