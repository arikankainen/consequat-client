import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Album, Exif, Photo, User } from 'utils/types';
import { EDIT_PHOTO, EDIT_PHOTOS, ADD_PHOTO, ME } from 'utils/queries';
import logger from 'utils/logger';

export enum SavePhotoStatus {
  idle,
  saving,
  ready,
  error,
}

interface Return {
  response: SavePhotoResponse;
  execute: (photo: SavePhoto | null | undefined) => void;
  reset: () => void;
}

interface SavePhotoResponse {
  data: Photo | null | undefined;
  status: SavePhotoStatus;
}

export interface SavePhoto {
  name?: string;
  location?: string | undefined;
  album?: string | undefined | null;
  description?: string;
  hidden?: boolean;
  tags?: string[];
  id?: string[];
  mainUrl?: string;
  thumbUrl?: string;
  filename?: string;
  thumbFilename?: string;
  originalFilename?: string;
  width?: number;
  height?: number;
  exif?: Exif;
}

const initialResponse = {
  data: undefined,
  status: SavePhotoStatus.idle,
};

const useSavePhoto = (): Return => {
  const [response, setResponse] = useState<SavePhotoResponse>(initialResponse);

  const [editPhoto, editPhotoResponse] = useMutation(EDIT_PHOTO, {
    onError: error => {
      logger.error(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const updatedPhoto = response.data.editPhoto;
          const existingPhotos = existingCache.me.photos;
          const existingAlbums = existingCache.me.albums;
          let albumHasChanged = false;

          const updatedPhotos = existingPhotos.map(photo =>
            photo.id === updatedPhoto.id ? updatedPhoto : photo
          );

          const oldAlbum = existingAlbums.find(album =>
            album.photos.find(photo => photo.id === updatedPhoto.id)
          );
          const newAlbum = updatedPhoto.album;

          const oldAlbumId = oldAlbum ? oldAlbum.id : null;
          const newAlbumId = newAlbum ? newAlbum.id : null;

          let updatedAlbums: Album[] = [];

          if (oldAlbumId !== newAlbumId) {
            albumHasChanged = true;

            updatedAlbums = existingAlbums.map(album => {
              const oldAlbumRemovedPhotos = album.photos.filter(
                photo => photo.id !== updatedPhoto.id
              );

              const updatedAlbumPhotos =
                album.id !== newAlbumId
                  ? oldAlbumRemovedPhotos
                  : oldAlbumRemovedPhotos.concat(updatedPhoto);

              return { ...album, photos: updatedAlbumPhotos };
            });
          }

          const updatedCache = {
            ...existingCache,
            me: {
              ...existingCache.me,
              photos: updatedPhotos,
              albums: albumHasChanged ? updatedAlbums : existingAlbums,
            },
          };

          cache.writeQuery({
            query: ME,
            data: updatedCache,
          });
        }
      } catch (error) {
        logger.error(error);
      }
    },
  });

  const [editPhotos, editPhotosResponse] = useMutation(EDIT_PHOTOS, {
    onError: error => {
      logger.error(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const updatedAlbum = (album: Album, photos: Photo[]) => {
            const filteredPhotos = album.photos.filter(albumPhoto => {
              let belongsToAlbum = true;

              photos.forEach(photo => {
                if (
                  photo.id === albumPhoto.id &&
                  (!photo.album || photo.album.id !== album.id)
                ) {
                  belongsToAlbum = false;
                }
              });

              return belongsToAlbum;
            });

            const photosToAdd = photos.filter(photo => {
              const alreadyInAlbum = album.photos.find(p => p.id === photo.id);
              return (
                photo.album && photo.album.id === album.id && !alreadyInAlbum
              );
            });

            return { ...album, photos: filteredPhotos.concat(photosToAdd) };
          };

          const responsePhotos: Photo[] = response.data.editPhotos;
          const existingPhotos = existingCache.me.photos;
          const existingAlbums = existingCache.me.albums;

          const updatedPhotos = existingPhotos.map(photo => {
            const updatedPhoto = responsePhotos.find(p => p.id === photo.id);
            return updatedPhoto ? updatedPhoto : photo;
          });

          const updatedAlbums = existingAlbums.map(album =>
            updatedAlbum(album, responsePhotos)
          );

          const updatedCache = {
            ...existingCache,
            me: {
              ...existingCache.me,
              photos: updatedPhotos,
              albums: updatedAlbums,
            },
          };

          cache.writeQuery({
            query: ME,
            data: updatedCache,
          });
        }
      } catch (error) {
        logger.error(error);
      }
    },
  });

  const [addPhoto, addPhotoResponse] = useMutation(ADD_PHOTO, {
    onError: error => {
      logger.error(error);
    },
    update: (cache, response) => {
      try {
        const existingCache: { me: User } | null = cache.readQuery({
          query: ME,
        });
        if (existingCache) {
          const newPhoto = response.data.addPhoto;

          const existingPhotos = existingCache.me.photos;
          const updatedPhotos = existingPhotos.concat(newPhoto);

          const updatedCache = {
            ...existingCache,
            me: {
              ...existingCache.me,
              photos: updatedPhotos,
            },
          };

          cache.writeQuery({
            query: ME,
            data: updatedCache,
          });
        }
      } catch (error) {
        logger.error(error);
      }
    },
  });

  useEffect(() => {
    if (editPhotoResponse.data && !editPhotoResponse.error) {
      setResponse({
        data: editPhotoResponse.data.editPhoto,
        status: SavePhotoStatus.ready,
      });
    } else if (editPhotoResponse.error) {
      logger.error(editPhotoResponse.error);

      setResponse({
        data: undefined,
        status: SavePhotoStatus.error,
      });
    }
  }, [editPhotoResponse.data, editPhotoResponse.error]);

  useEffect(() => {
    if (editPhotosResponse.data && !editPhotosResponse.error) {
      setResponse({
        data: editPhotosResponse.data.editPhotos,
        status: SavePhotoStatus.ready,
      });
    } else if (editPhotosResponse.error) {
      logger.error(editPhotosResponse.error);

      setResponse({
        data: undefined,
        status: SavePhotoStatus.error,
      });
    }
  }, [editPhotosResponse.data, editPhotosResponse.error]);

  useEffect(() => {
    if (addPhotoResponse.data && !addPhotoResponse.error) {
      setResponse({
        data: addPhotoResponse.data.addPhoto,
        status: SavePhotoStatus.ready,
      });
    } else if (addPhotoResponse.error) {
      logger.error(addPhotoResponse.error);

      setResponse({
        data: undefined,
        status: SavePhotoStatus.error,
      });
    }
  }, [addPhotoResponse.data, addPhotoResponse.error]);

  const execute = (photo: SavePhoto | null | undefined) => {
    if (!photo) return;

    setResponse({
      data: undefined,
      status: SavePhotoStatus.saving,
    });

    if (photo.id && photo.id.length > 1) {
      editPhotos({
        variables: photo,
      });
    } else if (photo.id) {
      editPhoto({
        variables: {
          name: photo.name || '',
          location: photo.location || '',
          album: photo.album || null,
          description: photo.description || '',
          hidden: photo.hidden,
          tags: photo.tags || [],
          id: photo.id[0],
        },
      });
    } else {
      addPhoto({
        variables: {
          mainUrl: photo.mainUrl,
          thumbUrl: photo.thumbUrl,
          filename: photo.filename,
          thumbFilename: photo.thumbFilename,
          originalFilename: photo.originalFilename,
          width: photo.width,
          height: photo.height,
          name: photo.name,
          exif: photo.exif,
        },
      });
    }
  };

  const reset = () => {
    setResponse({
      data: undefined,
      status: SavePhotoStatus.idle,
    });
  };

  return { response, execute, reset };
};

export default useSavePhoto;
