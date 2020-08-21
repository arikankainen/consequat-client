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
import Confirmation, { ConfirmationProps } from '../ConfirmationDialog/Confirmation';

import {
  PictureWithData,
  addPicture,
  removePicture,
  removePictures,
  updateProgress
} from '../../reducers/pictureReducer';

import {
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
  PictureListToolBarButton,
  PictureListArea,
  UploadFileButton
} from '../PictureList/Styles';

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
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({});
  const [uploadCancelled, setUploadCancelled] = useState<boolean>(false);
  const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
  const [uploadCount, setUploadCount] = useState<number>(0);

  const [addPhotoToDb] = useMutation(ADD_PHOTO, {
    onError: (error) => {
      console.log(error);
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

  const reportProgress = (filename: string, percentage: number) => {
    dispatch(updateProgress(filename, percentage));
    const remainingFiles = pictureState.pictures.length;
    const percentageFiles = ((uploadCount - remainingFiles) / uploadCount) * 100;
    const oneFilePercentage = 100 / uploadCount;

    setConfirmation({
      ...confirmation,
      text: filename,
      progress: percentage,
      text2: `Picture ${uploadCount - remainingFiles + 1} of ${uploadCount}`,
      progress2: percentageFiles + (percentage * (oneFilePercentage / 100)),
    });
  };

  const uploadPicture = (file: File, filename: string) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(filename);
      const task = storageRef.put(file);

      task.on('state_changed',
        function progress(snapshot) {
          const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          reportProgress(file.name, percentage);
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          console.log('picture upload complete');
          storageRef.getDownloadURL().then(url => {
            reportProgress(file.name, 100);
            resolve(url);
          });
        }
      );
    });
  };

  const uploadThumb = (file: Blob, filename: string) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(filename);
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
    const filename = `images/${uuid()}`;
    const thumbFilename = `images/${uuid()}`;

    const resized = await resizeImage(file, true, 500);
    const mainUrl = await uploadPicture(file, filename);
    const thumbUrl = (resized != null) ? await uploadThumb(resized, thumbFilename) : '';

    addPhotoToDb({
      variables: {
        mainUrl: mainUrl,
        thumbUrl: thumbUrl,
        filename,
        thumbFilename,
        originalFilename: file.name,
        name: file.name
      }
    });

    dispatch(removePicture(file.name));
  };

  const startNewUpload = () => {
    if (pictureState.pictures.length > 0) {
      const file = pictureState.pictures[0].picture;
      reportProgress(file.name, 0);
      doUpload(file);
    }
  };

  const uploadDone = () => {
    setConfirmation({
      ...confirmation,
      topic: 'Upload completed',
      text: 'All files uploaded',
      handleOk: () => setConfirmation({}),
      handleCancel: undefined,
    });
  };

  const uploadAborted = () => {
    setConfirmation({
      ...confirmation,
      topic: 'Upload aborted',
      handleOk: () => setConfirmation({}),
      handleCancel: undefined,
    });
  };

  useEffect(() => {
    if (uploadInProgress && pictureState.pictures.length > 0) {
      const uploadingAlready = pictureState.pictures.filter(p => p.progress > -1);

      if (uploadingAlready.length === 0) {
        if (!uploadCancelled) startNewUpload();
        else uploadAborted();
      }

    } else if (uploadInProgress && pictureState.pictures.length === 0) {
      setUploadInProgress(false);
      uploadDone();
    }
  }, [pictureState, uploadInProgress, uploadCancelled]);

  const handleUploadPicturesAbort = () => {
    setUploadCancelled(true);
  };

  useEffect(() => {
    if (uploadCancelled) {
      setConfirmation({
        ...confirmation,
        disableCancel: true,
      });
    } else {
      setConfirmation({
        ...confirmation,
        disableCancel: false,
      });
    }
  }, [uploadCancelled]);

  const handleUploadPicturesConfirmed = () => {
    setConfirmation({
      open: true,
      topic: 'Uploading...',
      text: '...',
      progress: 0,
      text2: '...',
      progress2: 0,
      handleCancel: handleUploadPicturesAbort
    });

    setUploadCount(pictureState.pictures.length);
    setUploadCancelled(false);
    setUploadInProgress(true);
  };

  const handleUploadPictures = () => {
    const count = pictures.length;
    const text = count === 1 ?
      'Upload selected photo?' :
      `Upload ${count} selected photos?`;

    setConfirmation({
      open: true,
      text,
      handleOk: handleUploadPicturesConfirmed,
      handleCancel: () => setConfirmation({}),
    });
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
    <PictureListContainer>
      <Confirmation {...confirmation} />

      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <PictureListToolBarButton onClick={handleAddPictures}>Add</PictureListToolBarButton>
            {selectedCount === 0
              ?
              <PictureListToolBarButton onClick={handleRemovePictures}>Remove all</PictureListToolBarButton>
              :
              <PictureListToolBarButton onClick={handleRemovePictures}>Remove ({selectedCount})</PictureListToolBarButton>
            }
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <PictureListToolBarButton onClick={handleUploadPictures}>Upload all</PictureListToolBarButton>
          </PictureListButtonGroup>
        </PictureListButtonGroups>

        <InfoArea
          pictureCount={pictureCount}
          selectedCount={selectedCount}
          selectedFile={selectedFile}
        />
      </PictureListToolBar>

      <PictureListArea count={pictures.length}>
        {pictures.map(file =>
          <Thumbnail
            key={file.picture.name}
            file={file.picture}
            progress={file.progress}
            selected={file.selected}
          />
        )}
      </PictureListArea>

      <form onSubmit={handleSubmit}>
        <UploadFileButton
          type='file'
          ref={fileInput}
          onChange={handleFileChange}
          multiple
          accept='image/*'
        />
      </form>
    </PictureListContainer>
  );
};

export default UploadForm;