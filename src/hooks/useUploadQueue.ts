import { useState, useEffect } from 'react';
import useUploadPhoto, { UploadPhotoStatus } from './useUploadPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { removePicture } from '../reducers/pictureReducer';

export enum QueueStatus {
  idle,
  running,
  ready,
  error,
  aborted,
}

interface Return {
  response: Response;
  execute: () => void;
  abort: () => void;
  reset: () => void;
}

interface Response {
  status: QueueStatus;
  totalProgress: number;
  fileProgress: number;
  currentFile: number;
  totalFiles: number;
  currentName: string;
}

const initialResponse = {
  status: QueueStatus.idle,
  totalProgress: 0,
  fileProgress: 0,
  currentFile: 0,
  totalFiles: 0,
  currentName: '',
};

const useUploadQueue = (): Return => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const dispatch = useDispatch();
  const [response, setResponse] = useState<Response>(initialResponse);
  const [status, setStatus] = useState<QueueStatus>(QueueStatus.idle);
  const [totalProgress, setTotalProgress] = useState(0);
  const [fileProgress, setFileProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState<File | null>(null);
  const [currentName, setCurrentName] = useState('');
  const [uploadResponse, uploadPhoto] = useUploadPhoto();

  useEffect(() => {
    setResponse({
      status,
      totalProgress,
      fileProgress,
      currentFile,
      totalFiles,
      currentName,
    });
  }, [status, totalProgress, fileProgress, currentFile, totalFiles, currentName]);

  useEffect(() => {
    if (!pictureState.pictures || !totalFiles) return;
    const photos = pictureState.pictures;

    const percent = Math.round(((totalFiles - photos.length) / totalFiles) * 100);
    const current = photos.length > 0 ? totalFiles - photos.length + 1 : totalFiles;
    setTotalProgress(percent);
    setCurrentFile(current);
  }, [pictureState.pictures, totalFiles]);

  useEffect(() => {
    if (!pictureState.pictures) return;

    const photo = pictureState.pictures.find(p => p.picture.name === currentName);
    if (!photo) return;

    if (photo.progress > -1) setFileProgress(photo.progress);
  }, [pictureState.pictures, currentName]);

  useEffect(() => {
    if (status !== QueueStatus.running) return;

    if (pictureState.pictures && pictureState.pictures.length > 0) {
      setCurrentPhoto(pictureState.pictures[0].picture);
      setCurrentName(pictureState.pictures[0].picture.name);
    } else {
      setStatus(QueueStatus.ready);
    }
  }, [pictureState.pictures.length, status]);

  useEffect(() => {
    if (status === QueueStatus.aborted || !currentPhoto) return;

    uploadPhoto(currentPhoto);
  }, [currentPhoto]);

  useEffect(() => {
    if (uploadResponse.status === UploadPhotoStatus.ready) {
      dispatch(removePicture(currentName));
    } else if (uploadResponse.status === UploadPhotoStatus.error) {
      setStatus(QueueStatus.error);
    }
  }, [uploadResponse.status]);

  const execute = () => {
    if (pictureState.pictures.length === 0) return;

    setTotalFiles(pictureState.pictures.length);
    setStatus(QueueStatus.running);
  };

  const abort = () => {
    setStatus(QueueStatus.aborted);
  };

  const reset = () => {
    setResponse(initialResponse);
  };

  return {
    response,
    execute,
    abort,
    reset,
  };
};

export default useUploadQueue;
