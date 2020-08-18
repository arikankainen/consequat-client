import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { storage } from '../../firebase/firebase';
import { useMutation } from '@apollo/client';
import { ADD_PHOTO, ME } from '../../utils/queries';
import { v1 as uuid } from 'uuid';
import Thumbnail from './Thumbnail';
import InfoArea from './InfoArea';
import resizeImage from '../../utils/resizeImage';

import {
  PictureWithData,
  addPicture,
  removePicture,
  removePictures,
  updateProgress
} from '../../reducers/pictureReducer';

import {
  UploadContainer,
  UploadToolBar,
  UploadButtonGroups,
  UploadButtonGroup,
  UploadToolBarButton,
  UploadPictureArea,
  UploadFileButton
} from './Styles';

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
    },
    refetchQueries: [{ query: ME }]
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
      const storageRef = storage.ref(`images/${uuid()}`);
      const task = storageRef.put(file);

      task.on('state_changed',
        function progress(snapshot) {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('picture:', percentage);
          dispatch(updateProgress(file.name, Math.round(percentage)));
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          console.log('picture upload complete');
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            dispatch(updateProgress(file.name, 100));
            resolve(url);
          });
        }
      );
    });
  };

  const uploadThumb = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(`images/${uuid()}`);
      const task = storageRef.put(file);

      task.on('state_changed',
        function progress(snapshot) {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('thumb:', percentage);
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          console.log('thumb upload complete');
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            resolve(url);
          });
        }
      );
    });
  };

  const doUpload = async (file: File) => {
    const resized = await resizeImage(file, true, 500);
    const mainUrl = await uploadPicture(file);
    const thumbUrl = (resized != null) ? await uploadThumb(resized) : mainUrl;

    addPhotoToDb({
      variables: {
        mainUrl: mainUrl,
        thumbUrl: thumbUrl,
        originalFilename: file.name,
        name: file.name
      }
    });

    dispatch(removePicture(file.name));
  };

  async function asyncForEach(array: PictureWithData[], callback: Function) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const handleUploadPictures = async () => {
    if (pictures) {
      await asyncForEach(
        pictures, async (pictureWithData: PictureWithData) => doUpload(pictureWithData.picture)
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
    <UploadContainer>
      <UploadToolBar>
        <UploadButtonGroups>
          <UploadButtonGroup>
            <UploadToolBarButton onClick={handleAddPictures}>Add</UploadToolBarButton>
            {selectedCount === 0
              ?
              <UploadToolBarButton onClick={handleRemovePictures}>Remove all</UploadToolBarButton>
              :
              <UploadToolBarButton onClick={handleRemovePictures}>Remove ({selectedCount})</UploadToolBarButton>
            }
          </UploadButtonGroup>

          <UploadButtonGroup>
            <UploadToolBarButton onClick={handleUploadPictures}>Upload all</UploadToolBarButton>
          </UploadButtonGroup>
        </UploadButtonGroups>

        <InfoArea
          pictureCount={pictureCount}
          selectedCount={selectedCount}
          selectedFile={selectedFile}
        />
      </UploadToolBar>

      <UploadPictureArea count={pictures.length}>
        {pictures.map(file =>
          <Thumbnail
            key={file.picture.name}
            picture={file.picture}
            progress={file.progress}
            selected={file.selected}
          />
        )}
      </UploadPictureArea>

      <form onSubmit={handleSubmit}>
        <UploadFileButton
          type='file'
          ref={fileInput}
          onChange={handleFileChange}
          multiple
          accept='image/*'
        />
      </form>
    </UploadContainer>
  );
};

export default UploadForm;