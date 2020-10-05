export interface Exif {
  dateTimeOriginal: string;
  fNumber: string;
  isoSpeedRatings: string;
  shutterSpeedValue: string;
  focalLength: string;
  flash: string;
  make: string;
  model: string;
}

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
  hidden: boolean;
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
  hidden: boolean;
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

export interface Comment {
  dateAdded: string;
  text: string;
  author: User;
  photo: Photo;
  id: string;
}
