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

export interface UserToSave {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface Photo {
  mainUrl: string;
  thumbUrl: string;
  filename: string;
  thumbFilename: string;
  originalFilename: string;
  width: number;
  height: number;
  name: string;
  location: string;
  description: string;
  tags: string[];
  dateAdded: Date;
  id: string;
  album: { id: string };
}

export interface PhotoUserExtended {
  mainUrl: string;
  thumbUrl: string;
  filename: string;
  thumbFilename: string;
  originalFilename: string;
  width: number;
  height: number;
  name: string;
  location: string;
  description: string;
  tags: string[];
  dateAdded: Date;
  id: string;
  album: { id: string };
  user: { fullname: string };
}

export interface Album {
  name: string;
  description: string;
  photos: Photo[];
  id: string;
}
