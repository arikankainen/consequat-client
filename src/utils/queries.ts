import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    listUsers {
      username,
      password,
      email,
      fullname,
      isAdmin,
      id,
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      token,
    }
  }
`;

export const SIGNUP = gql`
  mutation createUser(
    $username: String!,
    $email: String!,
    $fullname: String!,
    $password: String!) {
      createUser(
        username: $username,
        email: $email,
        fullname: $fullname,
        password: $password,
      ) {
        username,
        email,
        fullname,
        isAdmin,
        id,
      }
    }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $email: String,
    $oldPassword: String,
    $newPassword: String) {
      editUser(
        email: $email,
        oldPassword: $oldPassword,
        newPassword: $newPassword,
      ) {
        username,
        email,
        fullname,
        isAdmin,
        id,
      }
    }
`;

const PHOTO_DETAILS = gql`
  fragment PhotoDetails on Photo {
    mainUrl,
    thumbUrl,
    filename,
    thumbFilename,
    originalFilename,
    width,
    height,
    name,
    location,
    description,
    hidden,
    tags,
    dateAdded,
    id,
  }
`;

const ALBUM_DETAILS = gql`
  fragment AlbumDetails on Album {
    name,
    description,
    id,
  }
`;

export const ME = gql`
  query me {
    me {
      username,
      email,
      fullname,
      isAdmin,
      photos {
        ...PhotoDetails,
        album { id },
      },
      albums {
        ...AlbumDetails,
        photos {
          ...PhotoDetails,
        },
      }
      id,
    }
  }
  ${PHOTO_DETAILS}
  ${ALBUM_DETAILS}
`;

export const ADD_PHOTO = gql`
  mutation addPhoto(
    $mainUrl: String!,
    $thumbUrl: String!,
    $filename: String!,
    $thumbFilename: String!,
    $originalFilename: String!,
    $width: Int!,
    $height: Int!,
    $name: String!,
    $location: String,
    $description: String,
    $hidden: Boolean,
    $tags: [String],
  ) {
      addPhoto(
        mainUrl: $mainUrl,
        thumbUrl: $thumbUrl,
        filename: $filename,
        thumbFilename: $thumbFilename,
        originalFilename: $originalFilename,
        width: $width,
        height: $height,
        name: $name,
        location: $location,
        description: $description,
        hidden: $hidden,
        tags: $tags,
      ) {
        ...PhotoDetails,
      }
    }
  ${PHOTO_DETAILS}
`;

export const EDIT_PHOTO = gql`
  mutation editPhoto(
    $name: String!,
    $location: String,
    $description: String,
    $hidden: Boolean,
    $tags: [String],
    $album: String,
    $id: ID!,
  ) {
      editPhoto(
        name: $name,
        location: $location,
        description: $description,
        hidden: $hidden,
        tags: $tags,
        album: $album,
        id: $id,
      ) {
        ...PhotoDetails,
      }
    }
  ${PHOTO_DETAILS}
`;

export const EDIT_PHOTOS = gql`
  mutation editPhotos(
    $name: String,
    $location: String,
    $description: String,
    $hidden: Boolean,
    $tags: [String],
    $album: String,
    $id: [ID!]!,
  ) {
      editPhotos(
        name: $name,
        location: $location,
        description: $description,
        hidden: $hidden,
        tags: $tags,
        album: $album,
        id: $id,
      ) {
        ...PhotoDetails,
      }
    }
  ${PHOTO_DETAILS}
`;

export const DELETE_PHOTO = gql`
  mutation deletePhoto(
    $id: ID!,
  ) {
      deletePhoto(
        id: $id,
      ) {
        ...PhotoDetails,
      }
    }
  ${PHOTO_DETAILS}
`;

export const CREATE_ALBUM = gql`
  mutation createAlbum(
    $name: String!,
    $description: String,
  ) {
      createAlbum(
        name: $name,
        description: $description,
      ) {
        ...AlbumDetails,
      }
    }
  ${ALBUM_DETAILS}
`;

export const EDIT_ALBUM = gql`
  mutation editAlbum(
    $name: String!,
    $description: String,
    $id: ID!,
  ) {
      editAlbum(
        name: $name,
        description: $description,
        id: $id,
      ) {
        ...AlbumDetails,
      }
    }
  ${ALBUM_DETAILS}
`;

export const DELETE_ALBUM = gql`
  mutation deleteAlbum(
    $id: ID!,
  ) {
      deleteAlbum(
        id: $id,
      ) {
        ...AlbumDetails,
      }
    }
  ${ALBUM_DETAILS}
`;

export const LIST_PHOTOS = gql`
  query ($type: [String], $keyword: String) {
    listPhotos (type: $type, keyword: $keyword) {
    ...PhotoDetails,
    user { fullname },
    }
  }
  ${PHOTO_DETAILS}
`;

export const GET_PHOTO = gql`
  query getPhoto($id: String!) {
    getPhoto(id: $id) {
      ...PhotoDetails,
      user { fullname },
    }
  }
  ${PHOTO_DETAILS}
`;

export const LIST_COMMENTS = gql`
  query listComments($photo: String, $author: String) {
    listComments(
      photo: $photo,
      author: $author,
    ) {
      dateAdded,
      text,
      id,
      author {
        fullname,
      },
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment(
    $text: String!,
    $photo: String!,
  ) {
    createComment(
      text: $text,
      photo: $photo,
    ) {
      dateAdded,
      text,
      id,
      author {
        fullname,
      },
    }
  }
`;
