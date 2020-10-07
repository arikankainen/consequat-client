import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LIST_PHOTOS } from 'utils/queries';
import { PhotoUserExtended } from 'utils/types';

const useListPhotos = (type: string[], keyword: string | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setLoading(true);
    setPhotos([]);

    listPhotos({
      variables: { type, keyword },
    });
  }, [type, keyword, listPhotos]);

  useEffect(() => {
    const data = resultListPhotos.data;
    if (!data || !data.listPhotos) return;

    setPhotos(data.listPhotos);
    setHasMore(false);
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
