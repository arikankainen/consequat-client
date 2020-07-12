import React, { useState } from 'react';

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