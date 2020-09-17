import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import Button, { ButtonColor } from '../Buttons/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Topic = styled.div`
  font-size: 16px;
  color: #000;
  margin-bottom: 15px;
  line-height: 1.3;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin: 5px 10px 0px 10px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  margin-top: 2px;
`;

const Label = styled.label`
  color: #000;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.3;
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
  }, [open, url.search]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const address = `${url.pathname}?name=${name}&location=${location}&description=${description}&tags=${tags}&keyword=${keyword}`;

    history.replace(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Topic>Search inside of following information fields:</Topic>

        <CheckboxContainer>
          <Checkbox name="name" onChange={() => setName(!name)} checked={name} />
          <Label htmlFor="name" onClick={() => setName(!name)}>
            Photo name
          </Label>
        </CheckboxContainer>

        <CheckboxContainer>
          <Checkbox
            name="location"
            onChange={() => setLocation(!location)}
            checked={location}
          />
          <Label htmlFor="location" onClick={() => setLocation(!location)}>
            Location
          </Label>
        </CheckboxContainer>

        <CheckboxContainer>
          <Checkbox
            name="description"
            onChange={() => setDescription(!description)}
            checked={description}
          />
          <Label htmlFor="description" onClick={() => setDescription(!description)}>
            Description
          </Label>
        </CheckboxContainer>

        <CheckboxContainer>
          <Checkbox name="tags" onChange={() => setTags(!tags)} checked={tags} />
          <Label htmlFor="tags" onClick={() => setTags(!tags)}>
            Tags
          </Label>
        </CheckboxContainer>
        <Button
          text="Apply"
          onClick={() => void 0}
          margin={[20, 0, 0, 0]}
          color={ButtonColor.white}
          fullWidth
        />
      </Container>
    </form>
  );
};

export default Content;
