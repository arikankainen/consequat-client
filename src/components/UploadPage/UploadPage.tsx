import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import InitialUploadForm from './InitialUploadForm';
import UploadForm from './UploadForm';

const UploadPage = () => {
  const picture = useSelector((state: RootState) => state.picture);

  if (picture.pictures.length === 999) {
    return (
      <InitialUploadForm />
    );
  }

  return (
    <UploadForm pictures={picture.pictures} />
  );
};

export default UploadPage;