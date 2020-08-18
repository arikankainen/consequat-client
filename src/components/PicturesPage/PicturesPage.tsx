import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';

interface Photo {
  mainUrl: string;
  thumbUrl: string;
  originalName: string;
  name: string;
  description: string;
  dateAdded: Date;
  id: string;
}

const PicturesPage = () => {
  const resultMe = useQuery(ME);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (resultMe.data) {
      setPhotos(resultMe.data.me.photos);
    }
  }, [resultMe.data]);

  return (
    <div>
      {photos.map(photo =>
        <div key={photo.id}>
          {photo.mainUrl}<br />
          {photo.thumbUrl}<br />
          {photo.originalName}<br />
          {photo.name}<br />
          {photo.description}<br />
          {photo.dateAdded}<br />
          {photo.id}<br />
        </div>
      )}
    </div>
  );
};

export default PicturesPage;