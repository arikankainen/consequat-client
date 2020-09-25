import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_PHOTO, LIST_COMMENTS, CREATE_COMMENT } from '../../utils/queries';
import { setError } from '../../reducers/notificationReducer';
import { Photo, Comment } from '../../utils/types';
import logger from '../../utils/logger';

const PhotoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const resultPhoto = useQuery(GET_PHOTO, { variables: { id }, fetchPolicy: 'no-cache' });
  const resultComments = useQuery(LIST_COMMENTS, {
    variables: { photo: id },
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
          console.log(existingCache);
          console.log(response);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!photo) return;

    addComment({
      variables: { text: inputText, photo: photo.id },
    });
  };

  if (resultPhoto.loading) return <div>Loading...</div>;

  return (
    <div style={{ backgroundColor: '#222', width: '100%', height: '100%' }}>
      <img src={photo?.thumbUrl} alt={photo?.name} />
      <div>
        {comments.map(comment => (
          <div key={comment.id}>
            <div>{comment.author.fullname}</div>
            <div>{comment.dateAdded}</div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleInputChange} value={inputText} />
        </form>
      </div>
    </div>
  );
};

export default PhotoPage;
