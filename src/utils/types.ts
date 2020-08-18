export interface LoggedUser {
  username: string;
  email: string;
  fullname: string;
  isAdmin: boolean;
  id: string;
}

export interface Photo {
  mainUrl: string;
  thumbUrl: string;
  originalName: string;
  name: string;
  description: string;
  dateAdded: Date;
  id: string;
}