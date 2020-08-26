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

const PHOTOS_DETAILS = gql`
  fragment PhotoDetails on Photo {
    mainUrl,
    thumbUrl,
    filename,
    thumbFilename,
    originalFilename,
    name,
    description,
    dateAdded,
    id
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
        ...PhotoDetails
      },
      id
    }
  }
  ${PHOTOS_DETAILS}
`;

export const ADD_PHOTO = gql`
  mutation addPhoto(
    $mainUrl: String!,
    $thumbUrl: String!,
    $filename: String!
    $thumbFilename: String!
    $originalFilename: String!
    $name: String,
    $description: String
  ) {
      addPhoto(
        mainUrl: $mainUrl,
        thumbUrl: $thumbUrl,
        filename: $filename,
        thumbFilename: $thumbFilename,
        originalFilename: $originalFilename,
        name: $name,
        description: $description
      ) {
        ...PhotoDetails
      }
    }
  ${PHOTOS_DETAILS}
`;

export const EDIT_PHOTO = gql`
  mutation editPhoto(
    $name: String,
    $description: String,
    $id: ID!
  ) {
      editPhoto(
        name: $name,
        description: $description,
        id: $id
      ) {
        ...PhotoDetails
      }
    }
  ${PHOTOS_DETAILS}
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
  ${PHOTOS_DETAILS}
`;
