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
  height: 34px;
  border-radius: var(--input-border-radius);
  background-color: var(--input-bg-color);

  & > svg {
    width: 16px;
    min-width: 16px;
    color: var(--icon-color);
    color: #aaa;
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
  padding-top: 1px;
  line-height: 1;

  &:focus {
    outline-width: 0;
  }
`;

// TODO: add focus indicator
const Search = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <Input placeholder="Search photos" autoComplete="off" />
    </SearchContainer>
  );
};

export default Search;
