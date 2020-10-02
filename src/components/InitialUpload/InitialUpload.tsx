import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPicture } from '../../reducers/pictureReducer';
import { ReactComponent as ImagesIcon } from '../../images/cloud-upload-alt-solid.svg';
import Button from '../Button/Button';
import * as Styled from './style';

const InitialUpload = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file =>
        dispatch(addPicture(file))
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Styled.InitialUploadOuterContainer>
      <Styled.InitialUploadContainer>
        <ImagesIcon />
        <Styled.Topic>Select photos you want to upload</Styled.Topic>
        You may select one or multiple photos. Photos that you upload, are
        initially hidden from public galleries. If you wish, you can publish
        them to public after they have been uploaded.
        <form onSubmit={handleSubmit}>
          <Button
            onClick={handleClick}
            text="Select photos to upload"
            margin={[20, 0, 0, 0]}
          />
          <Styled.InitialUploadFileButton
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            multiple
            accept=".jpg,.jpeg,.png,.gif"
          />
        </form>
      </Styled.InitialUploadContainer>
    </Styled.InitialUploadOuterContainer>
  );
};

export default InitialUpload;
