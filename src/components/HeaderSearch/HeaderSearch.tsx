import React, { useState, useRef } from 'react';
import { ReactComponent as SearchIcon } from '../../images/search-solid.svg';
import { useHistory } from 'react-router-dom';
import * as Styled from './style';
import getSearchString from '../../utils/getSearchString';

const HeaderSearch = () => {
  const [focus, setFocus] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!keyWord.trim()) return;

    const address = getSearchString({
      name: true,
      location: true,
      description: true,
      tags: true,
      search: keyWord,
    });
    history.push(address);

    if (inputRef.current) inputRef.current.blur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  };

  return (
    <Styled.SearchContainer focus={focus}>
      <SearchIcon />
      <form onSubmit={handleSubmit}>
        <Styled.Input
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
    </Styled.SearchContainer>
  );
};

export default HeaderSearch;
