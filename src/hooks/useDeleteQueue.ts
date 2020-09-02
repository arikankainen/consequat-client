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
  const [deleteResponse, deletePhoto] = useDeletePhoto();
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
    if (status !== QueueStatus.running) return;

    if (photos && photos.length > 0) {
      setCurrentPhoto(photos[0]);
    } else {
      setStatus(QueueStatus.ready);
    }
  }, [photos, status]);

  useEffect(() => {
    if (aborted) return;

    if (currentPhoto) deletePhoto(currentPhoto);
  }, [currentPhoto, aborted]); // eslint-disable-line

  useEffect(() => {
    if (deleteResponse.status === DeletePhotoStatus.ready) {
      setPhotos(p => p.slice(1));
    } else if (deleteResponse.status === DeletePhotoStatus.error) {
      setStatus(QueueStatus.error);
    }
  }, [deleteResponse.status]);

  const execute = (selected: string[], photos: Photo[]) => {
    if (!selected || !photos) return;

    const selectedPhotos = photos.filter(photo => selected.includes(photo.id));
    setStatus(QueueStatus.running);
    setTotalFiles(selectedPhotos.length);
    setPhotos(selectedPhotos);
  };

  const reset = () => {
    setResponse(initialResponse);
    setAborted(false);
  };

  const abort = () => {
    setAborted(true);
    setStatus(QueueStatus.aborted);
  };

  return {
    response,
    execute,
    abort,
    reset,
  };
};

export default useDeleteQueue;
