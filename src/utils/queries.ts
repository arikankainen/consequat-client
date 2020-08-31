import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    listUsers {
      username,
      password,
      email,
      fullname,
      isAdmin,
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      token
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
        password: $password
      ) {
        username,
        email,
        fullname,
        isAdmin,
        id
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
    name,
    location,
    description,
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
    $filename: String!
    $thumbFilename: String!
    $originalFilename: String!
    $name: String,
    $location: String,
    $description: String
  ) {
      addPhoto(
        mainUrl: $mainUrl,
        thumbUrl: $thumbUrl,
        filename: $filename,
        thumbFilename: $thumbFilename,
        originalFilename: $originalFilename,
        name: $name,
        location: $location,
        description: $description
      ) {
        ...PhotoDetails
      }
    }
  ${PHOTO_DETAILS}
`;

export const EDIT_PHOTO = gql`
  mutation editPhoto(
    $name: String,
    $location: String,
    $description: String,
    $album: String,
    $id: ID!
  ) {
      editPhoto(
        name: $name,
        location: $location,
        description: $description,
        album: $album,
        id: $id
      ) {
        ...PhotoDetails
      }
    }
  ${PHOTO_DETAILS}
`;

export const DELETE_PHOTO = gql`
  mutation deletePhoto(
    $id: ID!
  ) {
      deletePhoto(
        id: $id
      ) {
        ...PhotoDetails
      }
    }
  ${PHOTO_DETAILS}
`;

export const EDIT_ALBUM = gql`
  mutation editAlbum(
    $name: String!,
    $description: String,
    $id: ID!
  ) {
      editAlbum(
        name: $name,
        description: $description,
        id: $id
      ) {
        ...AlbumDetails
      }
    }
  ${ALBUM_DETAILS}
`;
