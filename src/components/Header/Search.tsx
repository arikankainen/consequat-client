import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../images/menu_search.svg';

const SearchContainer = styled.div`
  display: flex;
  flex: 100;
  align-items: center;
  justify-content: flex-start;
  max-width: 400px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 15px;
  height: var(--button-size);
  border-radius: var(--input-border-radius);
  background-color: var(--input-bg-color);

  & > svg {
    height: var(--icon-size);
    color: var(--icon-color);
  }
`;

const Input = styled.input`
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: var(--input-bg-color);
  border: none;
  color: var(--input-color);
  font-size: var(--default-font-size);

  &:focus {
    outline-width: 0;
  }
`;

const Search = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <Input placeholder='Search photos' />
    </SearchContainer>
  );
};

export default Search;