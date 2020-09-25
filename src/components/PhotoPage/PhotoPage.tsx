import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_PHOTO, LIST_COMMENTS, CREATE_COMMENT } from '../../utils/queries';
import { setError } from '../../reducers/notificationReducer';
import { PhotoUserExtended, Comment } from '../../utils/types';
import logger from '../../utils/logger';
import ShowPhoto from './ShowPhoto';
import Comments from '../Comments/Comments';

const PhotoPage = () => {
  const loginState = useSelector((state: RootState) => state.system);
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<PhotoUserExtended | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const dispatch = useDispatch();

  const resultPhoto = useQuery(GET_PHOTO, { variables: { id }, fetchPolicy: 'no-cache' });
  const resultComments = useQuery(LIST_COMMENTS, {
    variables: { photo: id },
    pollInterval: 5000,
  });

  const [addComment, resultAddComment] = useMutation(CREATE_COMMENT, {
    onError: error => {
      console.log(error.graphQLErrors[0].message);
      dispatch(setError('Error', 'Cannot add comment.'));
    },
    update: (cache, response) => {
      try {
        const existingCache: { listComments: Comment[] } | null = cache.readQuery({
          query: LIST_COMMENTS,
          variables: { photo: id },
        });
        if (existingCache) {
          const existingComments = existingCache.listComments;
          const updatedComments = existingComments.concat(response.data.createComment);

          const updatedCache = {
            ...existingCache,
            listComments: updatedComments,
          };

          cache.writeQuery({
            query: LIST_COMMENTS,
            variables: { photo: id },
            data: updatedCache,
          });
        }
      } catch (error) {
        logger.error(error);
      }
    },
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

  useEffect(() => {
    //
  }, [resultAddComment.data]);

  const handleSubmit = (text: string) => {
    if (!photo) return;

    addComment({
      variables: { text, photo: photo.id },
    });
  };

  if (!photo) return null;
  if (resultPhoto.loading) return <div>Loading...</div>;

  return (
    <ShowPhoto photo={photo} commentCount={comments.length}>
      <Comments
        comments={comments}
        onSubmit={handleSubmit}
        loading={resultAddComment.loading || resultComments.loading}
        loggedIn={loginState.loggedIn}
      />
    </ShowPhoto>
  );
};

export default PhotoPage;
