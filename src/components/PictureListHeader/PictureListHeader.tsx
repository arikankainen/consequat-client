import React from 'react';
import { Photo, Album } from '../../utils/types';
import ListHeader from '../ListHeader/ListHeader';
import { getUniqueValue, uniqueList } from '../../utils/arrayHelpers';

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
  const notUnique = '(Multiple values)';
  const noValues = '(No photos selected)';

  const names = uniqueList(selectedPhotos.map(photo => photo.name));
  const locations = uniqueList(selectedPhotos.map(photo => photo.location));
  const descriptions = uniqueList(selectedPhotos.map(photo => photo.description));
  const tags = uniqueList(selectedPhotos.map(photo => photo.tags.join(', ')));

  return (
    <ListHeader
      items={[
        {
          name: 'Selected',
          value: `${selection.length} of ${photos.length}`,
        },
        {
          name: 'Photo',
          value: getUniqueValue(names, notUnique, noValues),
          grayed: !getUniqueValue(names),
        },
      ]}
      hiddenItems={[
        {
          name: 'Location',
          value: getUniqueValue(locations, notUnique, noValues),
          grayed: !getUniqueValue(locations),
        },
        {
          name: 'Description',
          value: getUniqueValue(descriptions, notUnique, noValues),
          grayed: !getUniqueValue(descriptions),
        },
        {
          name: 'Tags',
          value: getUniqueValue(tags, notUnique, noValues),
          grayed: !getUniqueValue(tags),
        },
      ]}
    />
  );
};
