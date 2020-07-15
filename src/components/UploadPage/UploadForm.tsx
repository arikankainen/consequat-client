import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addPicture } from '../../reducers/pictureReducer';
import { storage } from '../../firebase/firebase';
import Thumbnail from './Thumbnail';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
`;

const PictureArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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

const ToolBarButton = styled.button`
  height: 30px;
  margin: 10px;
  padding: 0px 10px;
  background-color: var(--accent-color-2);
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  font-size: var(--default-font-size);
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

interface UploadFormProps {
  pictures: File[];
}

const UploadForm: React.FC<UploadFormProps> = ({ pictures }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const uploadFiles = () => {
    if (pictures) {
      pictures.forEach(file => {
        const storageRef = storage.ref(`images/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed',
          function progress(snapshot) {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
          },
          function error(err) {
            console.log(err);
          },
          function complete() {
            console.log('complete');
            storageRef.getDownloadURL().then(url => {
              console.log(url);
            });
          }
        );
      });
    }
  };

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
      <ToolBar>
        <ToolBarButton onClick={handleClick}>Add more pictures</ToolBarButton>
        <ToolBarButton onClick={uploadFiles}>Upload pictures</ToolBarButton>
      </ToolBar>

      <PictureArea>
        {pictures.map(file => <Thumbnail key={file.name} picture={file} />)}
      </PictureArea>

      <Container>
        <form onSubmit={handleSubmit}>
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

export default UploadForm;