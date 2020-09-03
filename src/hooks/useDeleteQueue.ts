import { useState, useEffect } from 'react';
import useDeletePhoto, { DeletePhotoStatus } from './useDeletePhoto';
import { Photo } from '../utils/types';

export enum QueueStatus {
  idle,
  running,
  ready,
  error,
  aborted,
}

interface Return {
  response: Response;
  execute: (selected: string[], photos: Photo[]) => void;
  abort: () => void;
  reset: () => void;
}

interface Response {
  status: QueueStatus;
  progress: number;
  currentFile: number;
  totalFiles: number;
}

const initialResponse = {
  status: QueueStatus.idle,
  progress: 0,
  currentFile: 0,
  totalFiles: 0,
};

const useDeleteQueue = (): Return => {
  const [response, setResponse] = useState<Response>(initialResponse);
  const [status, setStatus] = useState<QueueStatus>(QueueStatus.idle);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | undefined>(undefined);
  const deletePhoto = useDeletePhoto();

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
    if (status !== QueueStatus.running) return;

    if (photos && photos.length > 0) {
      setCurrentPhoto(photos[0]);
    } else {
      setStatus(QueueStatus.ready);
    }
  }, [photos, status]);

  useEffect(() => {
    if (status === QueueStatus.aborted || !currentPhoto) return;

    deletePhoto.execute(currentPhoto);
  }, [currentPhoto]); // eslint-disable-line

  useEffect(() => {
    if (deletePhoto.response.status === DeletePhotoStatus.ready) {
      setPhotos(p => p.slice(1));
    } else if (deletePhoto.response.status === DeletePhotoStatus.error) {
      setStatus(QueueStatus.error);
    }
  }, [deletePhoto.response.status]);

  const execute = (selected: string[], photos: Photo[]) => {
    if (!selected || !photos) return;

    const selectedPhotos = photos.filter(photo => selected.includes(photo.id));
    setTotalFiles(selectedPhotos.length);
    setPhotos(selectedPhotos);
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

export default useDeleteQueue;
