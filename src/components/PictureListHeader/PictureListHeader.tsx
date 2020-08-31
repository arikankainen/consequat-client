import React from 'react';
import { Photo } from '../../utils/types';
import ListHeader from '../ListHeader/ListHeader';
import formatDate from '../../utils/formatDate';

interface PictureListHeaderProps {
  photos: Photo[];
  selection: string[];
}

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({ photos, selection }) => {
  const selectedPhotos = photos.filter((photo) => selection.includes(photo.id));
  const selectedPhoto = selectedPhotos.length === 1 ? selectedPhotos[0] : null;

  return (
    <ListHeader
      items={[
        {
          name: 'Date added',
          value: selectedPhoto && selectedPhoto.dateAdded && formatDate(selectedPhoto.dateAdded),
        },
        {
          name: 'Name',
          value: selectedPhoto?.name,
        },
        {
          name: 'Location',
          value: selectedPhoto?.location,
        },
        {
          name: 'Description',
          value: selectedPhoto?.description,
        },
      ]}
    />
  );
};
