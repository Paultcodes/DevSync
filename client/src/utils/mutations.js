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

export const INVITE_USER_TO_GROUP = gql`
 mutation inviteUserToGroup($userId: ID!, $groupId: ID!) {
  inviteUserToGroup(userId: $userId, groupId: $groupId) {
    _id
  }
 }
`

export const CREATE_HELP_WANTED = gql`
mutation createHelpWanted($groupId: ID!, $title: String!, $description: String!) {
  createHelpWanted(groupId: $groupId, title: $title, description: $description) {
    _id 
  }
}

`

export const SEND_MESSAGE = gql`
mutation createMessage($messageText: String!, $groupId: ID!) {
  createMessage(messageText: $messageText, groupId: $groupId) {
    chatMessages {
      messageText 
      from 
    }
  }
}
`
