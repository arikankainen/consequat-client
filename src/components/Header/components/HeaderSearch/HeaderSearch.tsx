import React, { useState, useRef } from 'react';
import { ReactComponent as SearchIcon } from 'images/search-solid.svg';
import { useHistory } from 'react-router-dom';
import * as Styled from './style';
import getSearchString from 'utils/getSearchString';

interface HeaderSearchProps {
  useInPage?: boolean;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ useInPage }) => {
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
    setKeyWord('');

    if (inputRef.current) inputRef.current.blur();
  };

  const handleIconClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  };

  return (
    <Styled.SearchContainer focus={focus} useInPage={useInPage} onClick={handleIconClick}>
      <SearchIcon />
      <form onSubmit={handleSubmit}>
        <Styled.Input
          useInPage={useInPage}
          placeholder={useInPage ? '' : 'Search photos'}
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
