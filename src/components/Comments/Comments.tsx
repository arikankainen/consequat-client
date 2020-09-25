import React, { useState } from 'react';
import { Comment } from '../../utils/types';
import formatDate from '../../utils/formatDate';
import Button from '../Buttons/Button';

import {
  Container,
  CommentContainer,
  InputContainer,
  Author,
  Date,
  Text,
  Input,
} from './style';

interface CommentsProps {
  comments: Comment[];
  onSubmit: (text: string) => void;
  loading: boolean;
  loggedIn: boolean;
}

const Comments: React.FC<CommentsProps> = ({ comments, onSubmit, loading, loggedIn }) => {
  const [inputComment, setInputComment] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || inputComment.trim().length === 0) return;

    setInputComment('');
    onSubmit(inputComment);
  };

  return (
    <Container>
      {comments.map(comment => (
        <CommentContainer key={comment.id}>
          <Author>{comment.author.fullname}</Author>
          <Date>{formatDate(comment.dateAdded)}</Date>
          <Text>{comment.text}</Text>
        </CommentContainer>
      ))}
      {loggedIn && (
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="text"
              onChange={handleInputChange}
              value={inputComment}
              disabled={loading}
            />
            <Button text="Add comment" onClick={() => void 0} disabled={loading} />
          </InputContainer>
        </form>
      )}
    </Container>
  );
};

export default Comments;
