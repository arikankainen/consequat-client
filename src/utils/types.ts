export interface LoggedUser {
  username: string;
  email: string;
  fullname: string;
  isAdmin: boolean;
  id: string;
}

export interface Me {
  username: string;
  email: string;
  fullname: string;
  isAdmin: boolean;
  photos: Photo[];
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
}