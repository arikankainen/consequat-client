import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PHOTO, LIST_COMMENTS } from '../../utils/queries';
import { Photo, Comment } from '../../utils/types';

const PhotoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const resultPhoto = useQuery(GET_PHOTO, { variables: { id }, fetchPolicy: 'no-cache' });
  const resultComments = useQuery(LIST_COMMENTS, {
    variables: { photo: id },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (resultPhoto.data) {
      setPhoto(resultPhoto.data.getPhoto);
    }
  }, [resultPhoto.data]);

  useEffect(() => {
    if (resultComments.data) {
      setComments(resultComments.data.listComments);
    }
  }, [resultComments.data]);

  console.log(photo);
  console.log(comments);

  if (resultPhoto.loading) return <div>Loading...</div>;

  return (
    <div>
      <img src={photo?.thumbUrl} alt={photo?.name} />
    </div>
  );
};

export default PhotoPage;
