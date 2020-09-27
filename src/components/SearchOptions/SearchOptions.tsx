import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '../Buttons/Button';
import { ButtonColor } from '../Buttons/style';
import * as Styled from './style';

interface SearchOptionsProps {
  open?: boolean;
  onSubmitted?: () => void;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({ open, onSubmitted }) => {
  const history = useHistory();
  const url = useLocation();
  const [name, setName] = useState(false);
  const [location, setLocation] = useState(false);
  const [description, setDescription] = useState(false);
  const [tags, setTags] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(url.search);
    setName(urlParams.get('name') === 'true');
    setLocation(urlParams.get('location') === 'true');
    setDescription(urlParams.get('description') === 'true');
    setTags(urlParams.get('tags') === 'true');

    const urlKeyWord = urlParams.get('keyword');
    if (urlKeyWord) setKeyword(urlKeyWord);
  }, [open, url.search]);

  useEffect(() => {
    if (!name && !location && !description && !tags) setDisabled(true);
    else setDisabled(false);
  }, [name, location, description, tags]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const address = `${url.pathname}?name=${name}&location=${location}&description=${description}&tags=${tags}&keyword=${keyword}`;

    history.replace(address);
    if (onSubmitted) onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Styled.Container>
        <Styled.Topic>
          Search inside of following information fields:
        </Styled.Topic>

        <Styled.CheckboxContainer>
          <Styled.Checkbox
            name="name"
            onChange={() => setName(!name)}
            checked={name}
          />
          <Styled.Label htmlFor="name" onClick={() => setName(!name)}>
            Photo name
          </Styled.Label>
        </Styled.CheckboxContainer>

        <Styled.CheckboxContainer>
          <Styled.Checkbox
            name="location"
            onChange={() => setLocation(!location)}
            checked={location}
          />
          <Styled.Label
            htmlFor="location"
            onClick={() => setLocation(!location)}
          >
            Location
          </Styled.Label>
        </Styled.CheckboxContainer>

        <Styled.CheckboxContainer>
          <Styled.Checkbox
            name="description"
            onChange={() => setDescription(!description)}
            checked={description}
          />
          <Styled.Label
            htmlFor="description"
            onClick={() => setDescription(!description)}
          >
            Description
          </Styled.Label>
        </Styled.CheckboxContainer>

        <Styled.CheckboxContainer>
          <Styled.Checkbox
            name="tags"
            onChange={() => setTags(!tags)}
            checked={tags}
          />
          <Styled.Label htmlFor="tags" onClick={() => setTags(!tags)}>
            Tags
          </Styled.Label>
        </Styled.CheckboxContainer>
        <Button
          text="Apply"
          onClick={() => void 0}
          margin={[20, 0, 0, 0]}
          color={ButtonColor.white}
          fullWidth
          disabled={disabled}
        />
      </Styled.Container>
    </form>
  );
};

export default SearchOptions;
