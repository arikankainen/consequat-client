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
  photosPerPage: number;
  preferCached: boolean;
}

const useListPhotos = ({
  type,
  keyword,
  page,
  photosPerPage,
  preferCached,
}: InputProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [photos, setPhotos] = useState<PhotoUserExtended[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  const [listPhotos, resultListPhotos] = useLazyQuery(LIST_PHOTOS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setLoading(true);

    listPhotos({
      variables: { type, keyword, offset, limit: photosPerPage },
    });
  }, [type, keyword, offset, photosPerPage, listPhotos]);

  useEffect(() => {
    setOffset(page * photosPerPage);
  }, [page, photosPerPage]);

  useEffect(() => {
    dispatch(updatePhotos(photos));
  }, [photos, dispatch]);

  useEffect(() => {
    const data = resultListPhotos.data;
    if (!data || !data.listPhotos) return;

    setTotalCount(data.listPhotos.totalCount);
    setPhotos(prevPhotos => {
      return [...prevPhotos, ...data.listPhotos.photos];
    });

    setLoading(false);
  }, [resultListPhotos.data, photosPerPage]);

  useEffect(() => {
    setHasMore(photos.length < totalCount);
  }, [photos, totalCount]);

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
