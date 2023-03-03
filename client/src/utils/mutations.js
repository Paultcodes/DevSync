//!GraphQL Mutations HERE!
import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation createUser($email: String!, $firstName: String!, $lastName: String!, $username: String!, $password: String!) {
    createUser(email: $email, firstName: $firstName, lastName: $lastName, username: $username, password: $password) {
      token
      user {
        _id
        firstName 
        lastName
        username
        email
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup($groupName: String!, $type: String!) {
    createGroup(groupName: $groupName, type: $type) {
      _id
      username
      email
    }
  }
`;
export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;
        
        