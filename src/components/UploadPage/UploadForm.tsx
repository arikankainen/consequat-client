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
  position: sticky;
  top: var(--header-height);
  z-index: 1;

  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgba(23, 23, 25, 0.9);
`;

const ButtonGroups = styled.div`
  display: flex;
  flex-direction: row;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 2px;
  width: 100%;
  padding: 20px;

  ${breakPoints.mobileXL} {
    padding: 0px;
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
  const [pictureCount, setPictureCount] = useState<number>(0);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setPictureCount(pictureState.pictures.length);
  }, [pictureState]);

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
            dispatch(removePicture(file.name));
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
        <ButtonGroups>
          <ButtonGroup>
            <ToolBarButton onClick={handleAddPictures}>Add</ToolBarButton>
            <ToolBarButton onClick={handleRemovePictures}>Remove</ToolBarButton>
          </ButtonGroup>
          <ButtonGroup>
            <ToolBarButton onClick={handleUploadPictures}>Upload</ToolBarButton>
          </ButtonGroup>
        </ButtonGroups>
        <EditArea
          pictureCount={pictureCount}
          selectedCount={selectedCount}
          selectedFile={selectedFile}
        />
      </ToolBar>

      <PictureArea>
        {/*
        kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd kfaösldk föaskdfsöl asköflk asödlfka sölfkaös dkfd 
        */}
        {pictures.map(file =>
          <Thumbnail
            key={file.picture.name}
            picture={file.picture}
            progress={file.progress}
            selected={file.selected}
          />
        )}
      </PictureArea>

      <form onSubmit={handleSubmit}>
        <FileButton
          type='file'
          ref={fileInput}
          onChange={handleFileChange}
          multiple
          /*accept='.jpg,.jpeg,.png,.gif'*/
          accept='image/*'
        />
      </form>
    </OuterContainer>
  );
};

export default UploadForm;