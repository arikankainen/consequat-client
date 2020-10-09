import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_PHOTO, LIST_COMMENTS, CREATE_COMMENT } from 'utils/queries';
import { setError } from 'reducers/notificationReducer';
import { setPreviousPhoto } from 'reducers/systemReducer';
import { PhotoUserExtended, Comment } from 'utils/types';
import logger from 'utils/logger';
import ShowPhoto from './components/ShowPhoto/ShowPhoto';
import Comments from './components/Comments/Comments';

const Photo = () => {
  const systemState = useSelector((state: RootState) => state.system);
  const photoListState = useSelector((state: RootState) => state.photoList);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState<PhotoUserExtended | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [prevPhoto, setPrevPhoto] = useState<string | undefined>(undefined);
  const [nextPhoto, setNextPhoto] = useState<string | undefined>(undefined);
  const url = useLocation();

  const prevAddress = url.search.replace('?prev=', '');

  const resultPhoto = useQuery(GET_PHOTO, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });

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
        const existingCache: {
          listComments: Comment[];
        } | null = cache.readQuery({
          query: LIST_COMMENTS,
          variables: { photo: id },
        });
        if (existingCache) {
          const existingComments = existingCache.listComments;
          const updatedComments = existingComments.concat(
            response.data.createComment
          );

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
    dispatch(setPreviousPhoto(id));
  }, [id, dispatch]);

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

  useEffect(() => {
    if (!photoListState.photos || !photo) return;
    const photos = photoListState.photos;

    const index = photos.findIndex(item => item.id === photo.id);
    if (index > 0) setPrevPhoto(photos[index - 1].id + url.search);
    if (photos.length > index + 1)
      setNextPhoto(photos[index + 1].id + url.search);
  }, [photoListState, photo, url.search]);

  const handleSubmit = (text: string) => {
    if (!photo) return;

    addComment({
      variables: { text, photo: photo.id },
    });
  };

  return (
    <ShowPhoto
      photo={photo}
      commentCount={comments.length}
      prevPhoto={prevPhoto}
      nextPhoto={nextPhoto}
      prevAddress={prevAddress}
    >
      <Comments
        comments={comments}
        onSubmit={handleSubmit}
        loading={resultAddComment.loading || resultComments.loading}
        loggedIn={systemState.loggedIn}
      />
    </ShowPhoto>
  );
};

export default Photo;
