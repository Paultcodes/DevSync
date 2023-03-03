//!GraphQL Queries GO HERE!
import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      ownedGroups {
        _id 
        groupName
      }
    }
  }
`;

export const ALL_USERS = gql`
 query getAllUsers {
  getAllUsers {
    _id 
    username
    firstName 
    lastName
  }
 }                  
`;


export const GET_PROFILE = gql`
 query getProfile($userId: ID!) {
  getProfile(userId: $userId) {
    _id 
    username 
  }
 }                
`;

