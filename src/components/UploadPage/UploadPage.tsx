import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import UploadThumbnail from './UploadThumbnail';
import UploadListHeader from '../UploadListHeader/UploadListHeader';
import Confirmation, { ConfirmationProps } from '../Dialogs/Confirmation';
import InitialUpload from '../InitialUpload/InitialUpload';
import { ReactComponent as DeleteButton } from '../../images/trash-solid.svg';
import { ReactComponent as CheckButton } from '../../images/check-circle-regular.svg';
import { ReactComponent as UncheckButton } from '../../images/check-circle-regular_modified.svg';
import { ReactComponent as AddButton } from '../../images/plus-square-solid.svg';
import Button, { ButtonColor } from '../Buttons/Button';
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum';
import useUploadQueue, { QueueStatus } from '../../hooks/useUploadQueue';

import {
  addPicture,
  removePicture,
  removePictures,
  updateSelected,
} from '../../reducers/pictureReducer';

import {
  PictureListContainer,
  PictureListToolBar,
  PictureListButtonGroups,
  PictureListButtonGroup,
  UploadFileButton,
} from '../PictureList/style';

const UploadForm = () => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const loginState = useSelector((state: RootState) => state.system);
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [pictureCount, setPictureCount] = useState<number>(0);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({});
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const history = useHistory();
  const uploadQueue = useUploadQueue(loginState.loggedUser?.username);
  const [queueStarted, setQueueStarted] = useState(false);

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
    } else {
      setSelectedFile(null);
    }

    if (count === pictureState.pictures.length) {
      if (!allSelected) setAllSelected(true);
    } else {
      if (allSelected) setAllSelected(false);
    }
  }, [pictureState]); // eslint-disable-line

  /* *************************** */

  const uploadDoneClosed = () => {
    setConfirmation({});

    setTimeout(() => {
      setUploadDialogOpen(false);
      history.replace('/pictures');
    }, 300);
  };

  useEffect(() => {
    if (!queueStarted) return;

    const status = uploadQueue.response.status;
    const response = uploadQueue.response;
    const text = response.currentName;
    const text2 = `Photo ${response.currentFile} of ${response.totalFiles}`;
    const progress = response.fileProgress;
    const progress2 = response.totalProgress;

    switch (status) {
      case QueueStatus.running:
        setConfirmation({
          open: true,
          topic: 'Uploading photos...',
          text,
          progress,
          text2,
          progress2,
          handleCancel: () => uploadQueue.abort(),
        });
        break;

      case QueueStatus.ready:
        setQueueStarted(false);
        setConfirmation({
          open: true,
          topic: 'Upload completed',
          text: 'All photos uploaded.',
          progress,
          text2,
          progress2,
          handleOk: uploadDoneClosed,
        });
        break;

      case QueueStatus.error:
        setQueueStarted(false);
        setConfirmation({
          open: true,
          topic: 'Upload failed',
          text: 'An error occurred while uploading.',
          handleOk: () => setConfirmation({}),
        });
        break;

      case QueueStatus.aborted:
        setQueueStarted(false);
        setConfirmation({
          open: true,
          topic: 'Upload aborted',
          text: 'Upload was aborted. Some photos may not have been uploaded.',
          handleOk: () => setConfirmation({}),
        });
        break;
    }
  }, [uploadQueue.response, queueStarted]); // eslint-disable-line

  const beginUploadPictures = () => {
    uploadQueue.reset();
    setQueueStarted(true);
    setUploadDialogOpen(true);
    uploadQueue.execute();
  };

  /* *************************** */

  const handleUploadPictures = () => {
    const count = pictureState.pictures.length;
    const text = count === 1 ? 'Upload photo?' : `Upload all ${count} photos?`;

    setConfirmation({
      open: true,
      text,
      handleOk: beginUploadPictures,
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
      pictureState.pictures.forEach(picture => {
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
      Array.from(event.target.files).forEach(file => dispatch(addPicture(file)));
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
      pictureState.pictures.forEach(element => {
        if (!element.selected) {
          dispatch(updateSelected(element.picture.name, true));
        }
      });
      setAllSelected(true);
    } else {
      pictureState.pictures.forEach(element => {
        if (element.selected) {
          dispatch(updateSelected(element.picture.name, false));
        }
      });
      setAllSelected(false);
    }
  };

  const handleSelectNone = () => {
    pictureState.pictures.forEach(element => {
      if (element.selected) {
        dispatch(updateSelected(element.picture.name, false));
      }
    });
    setAllSelected(false);
  };

  return (
    <>
      <PictureListToolBar>
        <PictureListButtonGroups>
          <PictureListButtonGroup>
            <Button
              onClick={handleAddPictures}
              text="Add"
              icon={AddButton}
              color={ButtonColor.black}
              breakPoint="280px"
            />
          </PictureListButtonGroup>

          <PictureListButtonGroup>
            {!allSelected ? (
              <Button
                onClick={handleSelectAll}
                text="Select all"
                icon={UncheckButton}
                color={ButtonColor.black}
                breakPoint="265px"
              />
            ) : (
              <Button
                onClick={handleSelectAll}
                text="Deselect all"
                icon={CheckButton}
                color={ButtonColor.black}
                breakPoint="265px"
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
              breakPoint="340px"
            />
          </PictureListButtonGroup>
        </PictureListButtonGroups>

        <UploadListHeader
          pictureCount={pictureCount}
          selectedCount={selectedCount}
          selectedFile={selectedFile}
        />
      </PictureListToolBar>

      <PictureListContainer>
        <Confirmation {...confirmation} />

        <PhotoAlbum
          name="Upload list"
          description="Photos to be uploaded"
          uploadButtonVisible={true}
          onUploadClick={handleUploadPictures}
          onOutsideClick={handleSelectNone}
        >
          <>
            {pictureState.pictures.map(file => (
              <UploadThumbnail
                key={file.picture.name}
                file={file.picture}
                selected={file.selected}
              />
            ))}
          </>
        </PhotoAlbum>

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
    </>
  );
};

export default UploadForm;
