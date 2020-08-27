export interface LoggedUser {
  username: string;
  email: string;
  fullname: string;
  isAdmin: boolean;
  id: string;
}

export interface User {
  username: string;
  email: string;
  fullname: string;
  isAdmin: boolean;
  photos: Photo[];
  albums: Album[];
  id: string;
}

export interface Photo {
  mainUrl: string;
  thumbUrl: string;
  filename: string;
  thumbFilename: string;
  originalFilename: string;
  name: string;
  location: string;
  description: string;
  dateAdded: Date;
  id: string;
  album: { id: string }[];
}

export interface Album {
  name: string;
  description: string;
  photos: { id: string }[];
  id: string;
}
