import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPicture } from '../../reducers/pictureReducer';
import { ReactComponent as ImagesIcon } from '../../images/menu_upload.svg';

import {
  InitialUploadOuterContainer,
  InitialUploadContainer,
  InitialUploadButton,
  InitialUploadFileButton
} from './Styles';

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
    <InitialUploadOuterContainer>
      <InitialUploadContainer>
        <ImagesIcon />
        Select pictures to upload by using the button below.
        <form onSubmit={handleSubmit}>
          <InitialUploadButton onClick={handleClick}>Select pictures to upload</InitialUploadButton>
          <InitialUploadFileButton
            type='file'
            ref={fileInput}
            onChange={handleFileChange}
            multiple
            accept='.jpg,.jpeg,.png,.gif'
          />
        </form>
      </InitialUploadContainer>
    </InitialUploadOuterContainer>
  );
};

export default InitialUploadForm;