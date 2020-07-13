import React, { useState } from 'react';
import { storage } from '../../firebase/firebase';

const UploadPage = () => {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileToUpload(event.target.files[0]);
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fileToUpload) {
      console.log(fileToUpload);

      const storageRef = storage.ref(`images/${fileToUpload.name}`);
      const task = storageRef.put(fileToUpload);

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
        }
      );
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;