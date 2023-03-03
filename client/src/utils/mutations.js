//!GraphQL Mutations HERE!
import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation createUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
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
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username) {
      _id
      username
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $username) {
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TAG = gql`
 mutation addTagsToUser($tag: String!) {
  addTagsToUser(tag: $tag) {
    _id 
    username
  }
 }
`
