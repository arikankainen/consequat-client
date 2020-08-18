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

export const ME = gql`
  query me {
    me {
      username,
      email,
      fullname,
      isAdmin,
      photos {
        mainUrl,
        thumbUrl,
        originalFilename,
        name,
        description,
        id
      },
      id
    }
  }
`;

export const ADD_PHOTO = gql`
  mutation addPhoto(
    $mainUrl: String!,
    $thumbUrl: String!,
    $originalFilename: String!
    $name: String!,
    $description: String) {
      addPhoto(
        mainUrl: $mainUrl,
        thumbUrl: $thumbUrl,
        originalFilename: $originalFilename,
        name: $name,
        description: $description
      ) {
        mainUrl,
        thumbUrl,
        originalFilename,
        name,
        description,
        dateAdded,
        id
      }
    }
`;
