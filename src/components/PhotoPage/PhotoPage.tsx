import React from 'react';
import { useParams } from 'react-router-dom';
//import { useQuery } from '@apollo/client';

const PhotoPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div>{id}</div>;
};

export default PhotoPage;
