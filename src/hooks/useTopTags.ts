import { useEffect, useState } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { TOP_TAGS } from 'utils/queries';
import { PhotoUserExtended } from 'utils/types';

export interface TopTags {
  tag: string;
  photos: PhotoUserExtended[];
}

interface Input {
  tags: number;
  photosPerTag: number;
}

const useTopTags = ({ tags, photosPerTag }: Input) => {
  const [topTags, setTopTags] = useState<TopTags[]>([]);
  const [refetched, setRefetched] = useState(false);
  const [notYetCached, setNotYetCached] = useState(false);

  const { loading, error, data, refetch, networkStatus } = useQuery(TOP_TAGS, {
    variables: { tags, photosPerTag },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!data && loading && !refetched) setNotYetCached(true);
    if (!data || !data.topTags || loading) return;

    setTopTags(data.topTags);
    if (!refetched && !notYetCached) {
      refetch();
      setRefetched(true);
    }
  }, [data, loading, refetched, notYetCached, refetch]);

  return {
    refetching: networkStatus === NetworkStatus.refetch,
    loading: networkStatus === NetworkStatus.loading,
    error: !!error,
    topTags,
  };
};

export default useTopTags;
