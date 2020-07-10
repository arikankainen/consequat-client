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

export const ME = gql`
  query me {
    me {
      username,
      email,
      fullname,
      isAdmin,
      id
    }
  }
`;
