import React from 'react';
import { Photo, Album } from '../../utils/types';
import ListHeader from '../ListHeader/ListHeader';

interface PictureListHeaderProps {
  photos: Photo[];
  albums: Album[];
  selection: string[];
}

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({
  photos,
  selection,
}) => {
  const selectedPhotos = photos.filter(photo => selection.includes(photo.id));
  const selectedPhoto = selectedPhotos.length === 1 ? selectedPhotos[0] : null;

  let photo = '';

  if (selectedPhoto && selectedPhotos.length === 1) {
    photo = selectedPhoto.name;
  } else if (selectedPhotos.length === 0) {
    photo = 'No photo selected';
  } else if (selectedPhotos.length > 1) {
    photo = 'Multiple photos selected';
  }

  return (
    <ListHeader
      items={[
        {
          name: 'Selected',
          value: `${selection.length} of ${photos.length}`,
        },
        {
          name: 'Photo',
          value: photo,
        },
      ]}
    />
  );
};
