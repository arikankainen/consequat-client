import React from 'react';
import { ReactComponent as SearchIcon } from '../../images/menu_search.svg';
import { SearchContainer, Input } from './Styles';

import { setMessage, setError } from '../../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setMessage('Dummy message', 'Nothing to show but a dummy message.'));
  };

  return (
    <SearchContainer>
      <SearchIcon onClick={clickHandler} />
      <Input placeholder='Search photos' />
    </SearchContainer>
  );
};

export default Search;