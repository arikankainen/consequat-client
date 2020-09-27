import React, { useState } from 'react';
import { Comment } from '../../utils/types';
import formatDate from '../../utils/formatDate';
import Button from '../Buttons/Button';
import { ReactComponent as UserIcon } from '../../images/user-solid.svg';
import * as Styled from './style';

interface CommentsProps {
  comments: Comment[];
  onSubmit: (text: string) => void;
  loading: boolean;
  loggedIn: boolean;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  onSubmit,
  loading,
  loggedIn,
}) => {
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
    <Styled.Container>
      {comments.map(comment => (
        <Styled.CommentContainer key={comment.id}>
          <UserIcon />
          <div>
            <Styled.Author>{comment.author.fullname}</Styled.Author>
            <Styled.Date>{formatDate(comment.dateAdded)}</Styled.Date>
            <Styled.Text>{comment.text}</Styled.Text>
          </div>
        </Styled.CommentContainer>
      ))}
      {loggedIn && (
        <form onSubmit={handleSubmit}>
          <Styled.InputContainer>
            <Styled.TextArea
              onChange={handleInputChange}
              value={inputComment}
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
              placeholder="Add your comment"
            ></Styled.TextArea>
            <Button
              text="Comment"
              onClick={() => void 0}
              disabled={loading}
              margin={[10, 0, 0, 0]}
            />
          </Styled.InputContainer>
        </form>
      )}
    </Styled.Container>
  );
};

export default Comments;
