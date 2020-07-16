import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addPicture } from '../../reducers/pictureReducer';

import { ReactComponent as ImagesIcon } from '../../images/menu_upload.svg';

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;

  & > svg {
    height: var(--image-size);
    color: var(--image-color);
    margin-bottom: 20px;
  }
`;

const FileButton = styled.input`
  display: none;
`;

const Button = styled.button`
  height: 30px;
  margin-top: 20px;
  padding: 0px 10px;
  background-color: var(--accent-color-2);
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  font-size: var(--default-font-size);
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline-width: 0;
  }

  &:hover {
    background-color: var(--accent-color-2-hover);
  }
  
  &:disabled {
    background-color: var(--accent-color-2);
    cursor: wait;
  }
`;

const InitialUploadForm = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file => dispatch(addPicture(file)));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <OuterContainer>
      <Container>
        <ImagesIcon />
        Select pictures to upload by using the button below.
        <form onSubmit={handleSubmit}>
          <Button onClick={handleClick}>Select pictures to upload</Button>
          <FileButton
            type='file'
            ref={fileInput}
            onChange={handleFileChange}
            multiple
            accept='.jpg,.jpeg,.png,.gif'
          />
        </form>
      </Container>
    </OuterContainer>
  );
};

export default InitialUploadForm;