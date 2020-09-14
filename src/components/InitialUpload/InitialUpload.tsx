import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPicture } from '../../reducers/pictureReducer';
import { ReactComponent as ImagesIcon } from '../../images/menu_upload.svg';
import Button from '../Buttons/Button';

import {
  InitialUploadOuterContainer,
  InitialUploadContainer,
  InitialUploadFileButton,
} from './style';

const InitialUpload = () => {
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
        <form onSubmit={handleSubmit}>
          <Button onClick={handleClick} text="Select pictures to upload" />
          <InitialUploadFileButton
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            multiple
            accept=".jpg,.jpeg,.png,.gif"
          />
        </form>
      </InitialUploadContainer>
    </InitialUploadOuterContainer>
  );
};

export default InitialUpload;
