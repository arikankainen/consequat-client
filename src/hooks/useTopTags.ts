import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
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

  const resultTopTags = useQuery(TOP_TAGS, {
    variables: { tags, photosPerTag },
    // fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const data = resultTopTags.data;
    const loading = resultTopTags.loading;
    if (!data || !data.topTags || loading) return;

    setTopTags(data.topTags);
  }, [resultTopTags.data, resultTopTags.loading]);

  return {
    loading: resultTopTags.loading,
    error: !!resultTopTags.error,
    topTags,
  };
};

export default useTopTags;
