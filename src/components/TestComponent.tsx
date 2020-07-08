import React from 'react';
import { useQuery } from '@apollo/client';
import { LoggedUser } from '../utils/types';
import { GET_USERS } from '../utils/queries';
import { updateLogin, updateLoginThunk } from '../reducers/systemReducer';
import { useDispatch } from 'react-redux';

function TestComponent() {
  const result = useQuery(GET_USERS);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateLogin({
      loggedIn: true,
      loggedToken: 'ffsdfsafsafsafsdaf',
      loggedUser: {
        username: 'user',
        email: 'user@mail.com',
        fullname: 'Normal User',
        isAdmin: false,
        id: 'fdsfsdfaslkfjasdflkjsalkdfjsadlfkjs'
      }
    }));
  };

  const handleClickThunk = () => {
    console.log('handle');
    dispatch(updateLoginThunk({
      loggedIn: true,
      loggedToken: '534k5ljlk4231kj5lk35',
      loggedUser: {
        username: 'admin',
        email: 'admin@mail.com',
        fullname: 'Administrator',
        isAdmin: true,
        id: '5345o43k2lö5432j5lk4j53kl'
      }
    }));
  };

  if (result.loading) {
    return null;
  }

  return (
    <div>
      {result.data.listUsers.map((p: LoggedUser) => p.username).join(', ')}
      <button onClick={handleClick}>dispatch</button>
      <button onClick={handleClickThunk}>dispatch thunk</button>
    </div>
  );
}

export default TestComponent;
