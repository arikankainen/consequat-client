import { useState, useEffect } from 'react';
import { Photo } from '../utils/types';
import { storage } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import resizeImage from '../utils/resizeImage';
import imageDimensions from '../utils/imageDimensions';
import { v1 as uuid } from 'uuid';
import useSavePhoto, { SavePhotoStatus } from './useSavePhoto';
import { removePicture, updateProgress } from '../reducers/pictureReducer';
import getExif from '../utils/getExif';

export enum UploadPhotoStatus {
  idle,
  uploading,
  ready,
  error,
}

interface Return {
  response: UploadPhotoResponse;
  execute: (file: File) => void;
  reset: () => void;
}

interface UploadPhotoResponse {
  data: Photo | null | undefined;
  status: UploadPhotoStatus;
}

const initialResponse = {
  data: undefined,
  status: UploadPhotoStatus.idle,
};

const useUploadPhoto = (username?: string): Return => {
  const [response, setResponse] = useState<UploadPhotoResponse>(
    initialResponse
  );
  const [uploadedFilename, setUploadedFilename] = useState('');
  const savePhoto = useSavePhoto();
  const dispatch = useDispatch();

  const uploadResizedPicture = (
    file: Blob,
    storageFilename: string,
    filename: string
  ) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(storageFilename);
      const task = storageRef.put(file);

      task.on(
        'state_changed',
        function progress(snapshot) {
          const percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch(updateProgress(filename, percentage));
        },
        function error(err) {
          console.log(err);
          reject(err);
        },
        function complete() {
          storageRef.getDownloadURL().then(url => {
            dispatch(updateProgress(storageFilename, 100));
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
          storageRef.getDownloadURL().then(url => {
            resolve(url);
          });
        }
      );
    });
  };

  useEffect(() => {
    if (savePhoto.response.status === SavePhotoStatus.ready) {
      dispatch(removePicture(uploadedFilename));

      savePhoto.reset();
      setResponse({
        data: undefined,
        status: UploadPhotoStatus.ready,
      });
    } else if (savePhoto.response.status === SavePhotoStatus.error) {
      setResponse({
        data: undefined,
        status: UploadPhotoStatus.error,
      });
    }
  }, [savePhoto.response.status, uploadedFilename]); // eslint-disable-line

  const execute = async (file: File) => {
    if (!file || !username) return;

    setResponse({
      data: undefined,
      status: UploadPhotoStatus.uploading,
    });
    setUploadedFilename(file.name);

    try {
      const photoSize = 2000;
      const thumbSize = 600;

      const name = uuid();
      const filename = `images/${username}/${name}_p`;
      const thumbFilename = `images/${username}/${name}_t`;

      const exif = await getExif(file);
      console.log(exif);

      const { width, height } = await imageDimensions(file);

      const resizedPhoto = await resizeImage(file, false, photoSize);
      const resizedThumb = await resizeImage(file, false, thumbSize);

      if (!resizedPhoto || !resizedThumb) throw new Error();

      const mainUrl = await uploadResizedPicture(
        resizedPhoto,
        filename,
        file.name
      );
      const thumbUrl = await uploadThumb(resizedThumb, thumbFilename);

      savePhoto.execute({
        mainUrl: mainUrl as string,
        thumbUrl: thumbUrl as string,
        filename,
        thumbFilename,
        originalFilename: file.name,
        width,
        height,
        name: file.name,
      });
    } catch {
      setResponse({
        data: undefined,
        status: UploadPhotoStatus.error,
      });
    }
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: UploadPhotoStatus.idle,
    });
  };

  return { response, execute, reset };
};

export default useUploadPhoto;
