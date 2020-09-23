import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as SearchIcon } from '../../images/search-solid.svg';
import { useHistory } from 'react-router-dom';

interface SearchContainerProps {
  focus: boolean;
}

const SearchContainer = styled.div<SearchContainerProps>`
  display: flex;
  flex: 100;
  align-items: center;
  justify-content: flex-start;
  max-width: 300px;
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

  ${props =>
    props.focus &&
    css`
      background-color: #444;
      max-width: 400px;
  `}

  transition: all 200ms ease-in-out;
`;

const Input = styled.input`
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: transparent;
  border: none;
  color: var(--input-color);
  font-size: var(--default-font-size);
  padding-top: 1px;
  line-height: 1;

  &:focus {
    outline-width: 0;
  }
`;

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!keyWord.trim()) return;

    const searchOptions = 'name=true&location=true&description=true&tags=true';
    history.push(`/photos/?${searchOptions}&keyword=${keyWord}`);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  };

  return (
    <SearchContainer focus={focus}>
      <SearchIcon />
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search photos"
          autoComplete="off"
          spellCheck={false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          value={keyWord}
          ref={inputRef}
        />
      </form>
    </SearchContainer>
  );
};

export default Search;
