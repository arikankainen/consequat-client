import React from 'react';
//import { storage } from '../../firebase/firebase';
//import styled from 'styled-components';
import InitialUploadForm from './InitialUploadForm';

const UploadPage = () => {
  
  /*
  const uploadFiles = () => {
    if (filesToUpload) {
      Array.from(filesToUpload).forEach(file => {
        console.log(filesToUpload);

        const storageRef = storage.ref(`images/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed',
          function progress(snapshot) {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
          },
          function error(err) {
            console.log(err);
          },
          function complete() {
            console.log('complete');
            storageRef.getDownloadURL().then(url => {
              console.log(url);
            });
          }
        );
      });
    }
  };
  */

  return (
    <InitialUploadForm />
  );
};

export default UploadPage;