import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ContentProps {
  open: boolean;
}

const Content: React.FC<ContentProps> = ({ open }) => {
  const history = useHistory();
  const url = useLocation();
  const [name, setName] = useState(false);
  const [location, setLocation] = useState(false);
  const [description, setDescription] = useState(false);
  const [tags, setTags] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(url.search);
    setName(urlParams.get('name') === 'true');
    setLocation(urlParams.get('location') === 'true');
    setDescription(urlParams.get('description') === 'true');
    setTags(urlParams.get('tags') === 'true');

    const urlKeyWord = urlParams.get('keyword');
    if (urlKeyWord) setKeyword(urlKeyWord);
  }, [open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const address = `${url.pathname}?name=${name}&location=${location}&description=${description}&tags=${tags}&keyword=${keyword}`;

    history.replace(address);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="checkbox"
          onChange={() => setName(!name)}
          checked={name}
        />
        <label htmlFor="location">Location</label>
        <input
          name="location"
          type="checkbox"
          onChange={() => setLocation(!location)}
          checked={location}
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="checkbox"
          onChange={() => setDescription(!description)}
          checked={description}
        />
        <label htmlFor="tags">Tags</label>
        <input
          name="tags"
          type="checkbox"
          onChange={() => setTags(!tags)}
          checked={tags}
        />
        <button>ok</button>
      </form>
    </Container>
  );
};

export default Content;
