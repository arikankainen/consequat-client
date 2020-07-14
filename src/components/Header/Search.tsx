import React from 'react';
import { ReactComponent as SearchIcon } from '../../images/menu_search.svg';
import { SearchContainer, Input } from './Styles';

const Search = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <Input placeholder='Search photos' />
    </SearchContainer>
  );
};

export default Search;