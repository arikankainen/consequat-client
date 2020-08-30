import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { storage } from '../../firebase/firebase';
import { useMutation } from '@apollo/client';
import { ADD_PHOTO, ME } from '../../utils/queries';
import { v1 as uuid } from 'uuid';
import UploadThumbnail from './UploadThumbnail';
import PhotoInfoArea from '../PhotoInfoArea/PhotoInfoArea';
import resizeImage from '../../utils/resizeImage';
import Confirmation, { ConfirmationProps } from '../Dialogs/Confirmation';
import InitialUpload from '../InitialUpload/InitialUpload';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as CheckButton } from '../../images/button_check.svg';
import { ReactComponent as UncheckButton } from '../../images/button_uncheck.svg';
import { ReactComponent as UploadButton } from '../../images/button_upload.svg';
import { ReactComponent as AddButton } from '../../images/button_add.svg';
import Button, { ButtonColor } from '../Buttons/Button';
import PhotoAlbumTopic from '../PhotoAlbumTopic/PhotoAlbumTopic';
import AlbumContainer from '../PicturesPage/AlbumContainer';

import {
  addPicture,
  removePicture,
  removePictures,
  updateProgress,
  updateSelected,
} from '../../reducers/pictureReducer';

import {
  PictureListOuterContainer,
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
  PictureListArea,
  UploadFileButton,
} from '../PictureList/style';

const UploadForm = () => {
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
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const history = useHistory();

  const [addPhotoToDb] = useMutation(ADD_PHOTO, {
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: [{ query: ME }], // TODO: update cache manually
  });

  useEffect(() => {
    setPictureCount(pictureState.pictures.length);
  }, [pictureState]);

  useEffect(() => {
    let count = 0;
    pictureState.pictures.forEach((element) => {
      if (element.selected) count++;
    });
    setSelectedCount(count);

    if (count === 1) {
      pictureState.pictures.forEach((element) => {
        if (element.selected) {
          setSelectedFile(element.picture);
        }
      });
    } else {
      setSelectedFile(null);
    }

    if (count === pictureState.pictures.length) {
      if (!allSelected) setAllSelected(true);
    } else {
      if (allSelected) setAllSelected(false);
    }
  }, [pictureState]); // eslint-disable-line

  const reportProgress = (filename: string, percentage: number) => {
    dispatch(updateProgress(filename, percentage));
    const remainingFiles = pictureState.pictures.length;
    const percentageFiles =
      ((uploadCount - remainingFiles) / uploadCount) * 100;
    const oneFilePercentage = 100 / uploadCount;

    setConfirmation({
      ...confirmation,
      text: filename,
      progress: percentage,
      text2: `Photo ${uploadCount - remainingFiles + 1} of ${uploadCount}`,
      progress2: percentageFiles + percentage * (oneFilePercentage / 100),
    });
  };

  const uploadPicture = (file: File, filename: string) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(filename);
      const task = storageRef.put(file);

      task.on(
        'state_changed',
        function progress(snapshot) {
          const percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          reportProgress(file.name, percentage);
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          storageRef.getDownloadURL().then((url) => {
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

      task.on(
        'state_changed',
        function progress() {
          // empty
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          storageRef.getDownloadURL().then((url) => {
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
    const thumbUrl =
      resized != null ? await uploadThumb(resized, thumbFilename) : '';

    addPhotoToDb({
      variables: {
        mainUrl: mainUrl,
        thumbUrl: thumbUrl,
        filename,
        thumbFilename,
        originalFilename: file.name,
        name: file.name,
      },
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

  const uploadDoneClosed = () => {
    setConfirmation({});

    setTimeout(() => {
      setUploadDialogOpen(false);
      history.replace('/pictures');
    }, 300);
  };

  const uploadDone = () => {
    setConfirmation({
      ...confirmation,
      topic: 'Upload completed',
      text: 'All photos uploaded',
      handleOk: uploadDoneClosed,
      handleCancel: undefined,
    });

    setTimeout(() => {
      uploadDoneClosed();
    }, 1000);
  };

  const uploadAborted = () => {
    setConfirmation({
      ...confirmation,
      topic: 'Upload aborted',
      handleOk: uploadDoneClosed,
      handleCancel: undefined,
    });
  };

  useEffect(() => {
    if (uploadInProgress && pictureState.pictures.length > 0) {
      const uploadingAlready = pictureState.pictures.filter(
        (p) => p.progress > -1
      );

      if (uploadingAlready.length === 0) {
        if (!uploadCancelled) startNewUpload();
        else uploadAborted();
      }
    } else if (uploadInProgress && pictureState.pictures.length === 0) {
      setUploadInProgress(false);
      uploadDone();
    }
  }, [pictureState, uploadInProgress, uploadCancelled]); // eslint-disable-line

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
  }, [uploadCancelled]); // eslint-disable-line

  const handleUploadPicturesConfirmed = () => {
    setConfirmation({
      open: true,
      topic: 'Uploading...',
      text: '...',
      progress: 0,
      text2: '...',
      progress2: 0,
      handleCancel: handleUploadPicturesAbort,
    });

    setUploadDialogOpen(true);
    setUploadCount(pictureState.pictures.length);
    setUploadCancelled(false);
    setUploadInProgress(true);
  };

  const handleUploadPictures = () => {
    const count = pictureState.pictures.length;
    const text =
      count === 1 ? 'Upload selected photo?' : `Upload all ${count} photos?`;

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

  const handleRemovePicturesConfirmed = () => {
    setConfirmation({});

    if (selectedCount === 0) {
      dispatch(removePictures());
    } else {
      pictureState.pictures.forEach((picture) => {
        if (picture.selected) dispatch(removePicture(picture.picture.name));
      });
    }
  };

  const handleRemovePictures = () => {
    const count = selectedCount;
    const text =
      count === 1
        ? 'Really remove selected photo from upload list?'
        : `Really remove ${count} selected photos from upload list?`;

    setConfirmation({
      open: true,
      text,
      handleOk: handleRemovePicturesConfirmed,
      handleCancel: () => setConfirmation({}),
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) =>
        dispatch(addPicture(file))
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (pictureState.pictures.length === 0 && !uploadDialogOpen) {
    return <InitialUpload />;
  }

  const handleSelectAll = () => {
    if (!allSelected) {
      pictureState.pictures.forEach((element) => {
        if (!element.selected) {
          dispatch(updateSelected(element.picture.name, true));
        }
      });
      setAllSelected(true);
    } else {
      pictureState.pictures.forEach((element) => {
        if (element.selected) {
          dispatch(updateSelected(element.picture.name, false));
        }
      });
      setAllSelected(false);
    }
  };

  return (
    <PictureListOuterContainer>
      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <Button
              onClick={handleAddPictures}
              text="Add"
              icon={AddButton}
              color={ButtonColor.black}
            />
          </PictureListButtonGroup>
          <PictureListButtonGroup>
            {!allSelected ? (
              <Button
                onClick={handleSelectAll}
                text="Select all"
                icon={CheckButton}
                textRequired={true}
                color={ButtonColor.black}
              />
            ) : (
              <Button
                onClick={handleSelectAll}
                text="Deselect all"
                icon={UncheckButton}
                textRequired={true}
                color={ButtonColor.black}
              />
            )}
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            <Button
              onClick={handleRemovePictures}
              text="Remove"
              icon={DeleteButton}
              disabled={selectedCount === 0}
              color={ButtonColor.black}
            />
          </PictureListButtonGroup>
        </PictureListButtonGroups>

        <PhotoInfoArea
          pictureCount={pictureCount}
          selectedCount={selectedCount}
          selectedFile={selectedFile}
        />
      </PictureListToolBar>

      <PictureListContainer>
        <Confirmation {...confirmation} />

        <AlbumContainer>
          <PhotoAlbumTopic
            name="Upload list"
            description="Photos to be uploaded"
            buttonText="Upload"
            buttonTextRequired={true}
            buttonIcon={UploadButton}
            onClick={handleUploadPictures}
          />
          <PictureListArea count={pictureState.pictures.length}>
            {pictureState.pictures.map((file) => (
              <UploadThumbnail
                key={file.picture.name}
                file={file.picture}
                selected={file.selected}
              />
            ))}
          </PictureListArea>
        </AlbumContainer>

        <form onSubmit={handleSubmit}>
          <UploadFileButton
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </form>
      </PictureListContainer>
    </PictureListOuterContainer>
  );
};

export default UploadForm;
