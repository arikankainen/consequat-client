import React, { useState } from 'react';
import { Comment } from '../../utils/types';
import formatDate from '../../utils/formatDate';
import Button from '../Buttons/Button';
import { ReactComponent as UserIcon } from '../../images/user-solid.svg';

import {
  Container,
  CommentContainer,
  InputContainer,
  Author,
  Date,
  Text,
  TextArea,
} from './style';

interface CommentsProps {
  comments: Comment[];
  onSubmit: (text: string) => void;
  loading: boolean;
  loggedIn: boolean;
}

const Comments: React.FC<CommentsProps> = ({ comments, onSubmit, loading, loggedIn }) => {
  const [inputComment, setInputComment] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <UserIcon />
          <div>
            <Author>{comment.author.fullname}</Author>
            <Date>{formatDate(comment.dateAdded)}</Date>
            <Text>{comment.text}</Text>
          </div>
        </CommentContainer>
      ))}
      {loggedIn && (
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <TextArea
              onChange={handleInputChange}
              value={inputComment}
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
            ></TextArea>
            <Button
              text="Add comment"
              onClick={() => void 0}
              disabled={loading}
              margin={[10, 0, 0, 0]}
            />
          </InputContainer>
        </form>
      )}
    </Container>
  );
};

export default Comments;
