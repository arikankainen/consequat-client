import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { storage } from '../../firebase/firebase';
import { useMutation } from '@apollo/client';
import Thumbnail from './Thumbnail';
import {
  PictureWithData,
  addPicture,
  removePicture,
  removePictures,
  updateProgress
} from '../../reducers/pictureReducer';
import InfoArea from './InfoArea';
import breakPoints from '../../utils/breakPoints';
import { ADD_PHOTO } from '../../utils/queries';

const Container = styled.div`
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

  ${breakPoints.laptop} {
    margin: 0px 5px;
  }
`;

interface PictureAreaProps {
  count: number;
}

const PictureArea = styled.div<PictureAreaProps>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2px;
  width: 100%;
  padding: 20px;
  padding-top: 0px;

  ${breakPoints.laptop} {
    padding: 0px;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  ${breakPoints.mobileXL} {
    padding: 0px;
    ${props => props.count === 1 && css`
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    `}
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

  const [addPhotoToDb] = useMutation(ADD_PHOTO, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

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
        if (element.selected) {
          setSelectedFile(element.picture);
        }
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

            addPhotoToDb({
              variables: {
                mainUrl: url,
                thumbUrl: url,
                name: file.name
              }
            });

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
    <Container>
      <ToolBar>
        <ButtonGroups>
          <ButtonGroup>
            <ToolBarButton onClick={handleAddPictures}>Add</ToolBarButton>
            {selectedCount === 0
              ?
              <ToolBarButton onClick={handleRemovePictures}>Remove all</ToolBarButton>
              :
              <ToolBarButton onClick={handleRemovePictures}>Remove ({selectedCount})</ToolBarButton>
            }
          </ButtonGroup>

          <ButtonGroup>
            <ToolBarButton onClick={handleUploadPictures}>Upload all</ToolBarButton>
          </ButtonGroup>
        </ButtonGroups>

        <InfoArea
          pictureCount={pictureCount}
          selectedCount={selectedCount}
          selectedFile={selectedFile}
        />
      </ToolBar>

      <PictureArea count={pictures.length}>
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
          accept='image/*'
        />
      </form>
    </Container>
  );
};

export default UploadForm;