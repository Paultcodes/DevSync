//!GraphQL Mutations HERE!
import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
