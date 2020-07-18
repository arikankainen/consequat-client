import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { storage } from '../../firebase/firebase';
import Thumbnail from './Thumbnail';
import {
  PictureWithData,
  addPicture,
  removePicture,
  removePictures,
  updateProgress
} from '../../reducers/pictureReducer';
import EditArea from './EditArea';
import breakPoints from '../../utils/breakPoints';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const ToolBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin: 0px 15px;

  ${breakPoints.mobileXL} {
    margin: 0px 5px;
  }
`;

const PictureArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  box-sizing: border-box;
  padding: 10px;
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
  margin: 10px 5px;
  padding: 5px 10px;
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
  pictures: PictureWithData[];
}

const UploadForm: React.FC<UploadFormProps> = ({ pictures }) => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    let count = 0;
    pictureState.pictures.forEach(element => {
      if (element.selected) count++;
    });
    setSelectedCount(count);

    if (count === 1) {
      pictureState.pictures.forEach(element => {
        if (element.selected) setSelectedFile(element.picture);
      });
    }
    else {
      setSelectedFile(null);
    }
  }, [pictureState]);

  const uploadPicture = (file: File) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(`images/${file.name}`);
      const task = storageRef.put(file);

      task.on('state_changed',
        function progress(snapshot) {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
          dispatch(updateProgress(file.name, Math.round(percentage)));
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          console.log('complete');
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            dispatch(updateProgress(file.name, 100));
            resolve(url);
          });
        }
      );
    });
  };
  
  async function asyncForEach(array: PictureWithData[], callback: Function) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const handleUploadPictures = async () => {
    if (pictures) {
      await asyncForEach(
        pictures, async (pictureWithData: PictureWithData) => uploadPicture(pictureWithData.picture)
      );
    }
  };

  const handleAddPictures = () => {
    if (fileInput.current !== null) fileInput.current.click();
  };

  const handleRemovePictures = () => {
    if (selectedCount === 0) {
      dispatch(removePictures());
    }
    else {
      pictureState.pictures.forEach(picture => {
        if (picture.selected) dispatch(removePicture(picture.picture.name));
      });
    }
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
        <ButtonGroup>
          <ToolBarButton onClick={handleAddPictures}>Add</ToolBarButton>
          <ToolBarButton onClick={handleRemovePictures}>
            {selectedCount === 0 ?
              <span>Remove</span> :
              <span>Remove ({selectedCount})</span>
            }
          </ToolBarButton>
        </ButtonGroup>
        <ButtonGroup>
          <ToolBarButton onClick={handleUploadPictures}>Upload</ToolBarButton>
        </ButtonGroup>
      </ToolBar>

      <EditArea
        selectedCount={selectedCount}
        selectedFile={selectedFile}
      />

      <PictureArea>
        {pictures.map(file =>
          <Thumbnail
            key={file.picture.name}
            picture={file.picture}
            progress={file.progress}
            selected={file.selected}
          />
        )}
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