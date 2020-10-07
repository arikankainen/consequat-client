import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from 'utils/queries';
import { PhotoUserExtended } from 'utils/types';

const useListPhotos = (
  type: string[],
  keyword: string | null,
  page: number
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS, {
    fetchPolicy: 'network-only',
  });

  const photosPerPage = 10;

  useEffect(() => {
    setLoading(true);

    listPhotos({
      variables: { type, keyword, offset, limit: photosPerPage },
    });
  }, [type, keyword, offset, listPhotos]);

  useEffect(() => {
    setOffset(page * photosPerPage);
  }, [page]);

  useEffect(() => {
    const data = resultListPhotos.data;
    if (!data || !data.listPhotos) return;
    setHasMore(data.listPhotos.length === photosPerPage);

    setPhotos(prevPhotos => {
      return [...prevPhotos, ...data.listPhotos];
    });

    setLoading(false);
  }, [resultListPhotos.data]);

  useEffect(() => {
    const error = resultListPhotos.error;
    if (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  }, [resultListPhotos.error]);

  return { loading, error, errorMessage, photos, hasMore };
};

export default useListPhotos;
