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