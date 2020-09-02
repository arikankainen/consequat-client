import { useState, useEffect } from 'react';
import useDeletePhoto, { PhotoResponseStatus } from './useDeletePhoto';
import { Photo } from '../utils/types';

export enum ResponseStatus {
  idle,
  running,
  ready,
  error,
}

interface Response {
  data: string | undefined;
  status: ResponseStatus;
}

const initialResponse = {
  data: undefined,
  status: ResponseStatus.idle,
};

const useDeleteManyPhotos = (): [
  Response,
  (selected: string[], photos: Photo[]) => void
] => {
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | undefined>(undefined);
  const [response, setResponse] = useState<Response>(initialResponse);
  const [deleteResponse, deletePhoto] = useDeletePhoto();

  useEffect(() => {
    if (photos && photos.length > 0) {
      setCurrentPhoto(photos[0]);
      console.log('setCurrentPhoto', photos[0]);
    } else if (photos.length === 0 && response.status === ResponseStatus.running) {
      setResponse({
        data: undefined,
        status: ResponseStatus.ready,
      });
    }
  }, [photos]);

  useEffect(() => {
    if (currentPhoto) {
      deletePhoto(currentPhoto);
      console.log('deletePhoto', currentPhoto);
    }
  }, [currentPhoto]);

  useEffect(() => {
    if (deleteResponse.status == PhotoResponseStatus.ready) {
      setPhotos(photos.slice(1));
      console.log(photos.slice(1));
    } else if (deleteResponse.status == PhotoResponseStatus.error) {
      console.log('error');
    }
  }, [deleteResponse.status]);

  const deleteManyPhotos = (selected: string[], photos: Photo[]) => {
    if (!selected || !photos) return;

    setResponse({
      data: undefined,
      status: ResponseStatus.running,
    });

    const selectedPhotos = photos.filter((photo) => selected.includes(photo.id));
    setTotalPhotos(selectedPhotos.length);
    setPhotos(selectedPhotos);
  };

  return [response, deleteManyPhotos];
};

export default useDeleteManyPhotos;
