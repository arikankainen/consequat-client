import { Album, Photo } from 'utils/types';

export const compareAlbums = (a: Album, b: Album) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

export const comparePhotos = (a: Photo, b: Photo) => {
  if (a.dateAdded < b.dateAdded) return -1;
  if (a.dateAdded > b.dateAdded) return 1;
  return 0;
};
