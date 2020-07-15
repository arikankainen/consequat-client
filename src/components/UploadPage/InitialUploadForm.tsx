import React, { useState, useRef } from 'react';
import styled from 'styled-components';

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

const File = styled.input`
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
  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFilesToUpload(event.target.files);
      console.log(event.target.files);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <OuterContainer>
      <Container>
        <ImagesIcon />
        You can select pictures to upload by using the button below.
        <form onSubmit={handleSubmit}>
          <Button onClick={handleClick}>Select pictures to upload</Button>
          <File type='file' ref={fileInput} onChange={handleFileChange} multiple />
        </form>
        {filesToUpload && Array.from(filesToUpload).map(file => file.name)}
      </Container>
    </OuterContainer>
  );
};

export default InitialUploadForm;