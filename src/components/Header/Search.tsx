import React from 'react';
import { ReactComponent as SearchIcon } from '../../images/menu_search.svg';
import { SearchContainer, Input } from './Styles';

const Search = () => {
  const clickHandler = () => {
    console.log('click');
  };

  return (
    <SearchContainer>
      <SearchIcon onClick={clickHandler} />
      <Input placeholder='Search photos' />
    </SearchContainer>
  );
};

export default Search;