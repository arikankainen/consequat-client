import { useState, useEffect } from 'react';
import useDeletePhoto, { DeletePhotoStatus } from './useDeletePhoto';
import { Photo } from '../utils/types';

export enum DeletePhotosStatus {
  idle,
  running,
  ready,
  error,
  aborted,
}

interface DeletePhotosResponse {
  status: DeletePhotosStatus;
  progress: number;
  currentFile: number;
  totalFiles: number;
}

const initialResponse = {
  status: DeletePhotosStatus.idle,
  progress: 0,
  currentFile: 0,
  totalFiles: 0,
};

interface DeleteManyPhotosReturn {
  response: DeletePhotosResponse;
  execute: (selected: string[], photos: Photo[]) => void;
  abort: () => void;
  reset: () => void;
}

const useDeleteManyPhotos = (): DeleteManyPhotosReturn => {
  const [response, setResponse] = useState<DeletePhotosResponse>(initialResponse);
  const [status, setStatus] = useState<DeletePhotosStatus>(DeletePhotosStatus.idle);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | undefined>(undefined);
  const [deleteResponse, deletePhoto] = useDeletePhoto();
  const [alreadySliced, setAlreadySliced] = useState(false);
  const [aborted, setAborted] = useState(false);

  useEffect(() => {
    setResponse({ status, progress, currentFile, totalFiles });
  }, [status, progress, currentFile, totalFiles]);

  useEffect(() => {
    if (!photos || !totalFiles) return;

    const percent = Math.round(((totalFiles - photos.length) / totalFiles) * 100);
    const current = photos.length > 0 ? totalFiles - photos.length + 1 : totalFiles;
    setProgress(percent);
    setCurrentFile(current);
  }, [photos, totalFiles]);

  useEffect(() => {
    if (status !== DeletePhotosStatus.running) return;

    if (photos && photos.length > 0) {
      setCurrentPhoto(photos[0]);
    } else {
      setStatus(DeletePhotosStatus.ready);
    }
  }, [photos, status]);

  useEffect(() => {
    if (aborted) return;

    if (currentPhoto) {
      setAlreadySliced(false);
      deletePhoto(currentPhoto);
    }
  }, [currentPhoto, aborted]); // eslint-disable-line

  useEffect(() => {
    if (alreadySliced) return;

    if (deleteResponse.status === DeletePhotoStatus.ready) {
      setAlreadySliced(true);
      setPhotos(photos.slice(1));
    } else if (deleteResponse.status === DeletePhotoStatus.error) {
      setStatus(DeletePhotosStatus.error);
    }
  }, [deleteResponse.status, alreadySliced, photos]);

  const execute = (selected: string[], photos: Photo[]) => {
    if (!selected || !photos) return;

    const selectedPhotos = photos.filter((photo) => selected.includes(photo.id));
    setStatus(DeletePhotosStatus.running);
    setTotalFiles(selectedPhotos.length);
    setPhotos(selectedPhotos);
  };

  const reset = () => {
    setResponse(initialResponse);
    setAborted(false);
  };

  const abort = () => {
    setAborted(true);
    setStatus(DeletePhotosStatus.aborted);
  };

  return {
    response,
    execute,
    abort,
    reset,
  };
};

export default useDeleteManyPhotos;