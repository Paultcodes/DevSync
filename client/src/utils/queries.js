//!GraphQL Queries GO HERE!
import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      ownedGroups {
        _id
        groupName
        
        
      }
    
      invites {
        _id
        groupName
        status
      }
      skills
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
      email
      firstName 
      lastName
      skills
    }
  }
`;

export const SEARCH_GROUP_NAME = gql`
  query searchGroupName($groupName: String!) {
    searchGroupName(groupName: $groupName) {
      _id
      groupName
    }
  }
`;

export const SEARCH_USER = gql`
  query searchUser($username: String!) {
    searchUser(username: $username) {
      _id
      username
    }
  }
`;

// export const GET_GROUP = gql`
// query getGroup($groupId: ID!) {
//   getGroup(groupId: $groupId) {
//     _id
//     groupName
//     type

//   }
// }

// `

export const GET_GROUP = gql`
  query getGroup($groupId: ID!) {
    getGroup(groupId: $groupId) {
      _id
      groupName
      type
      isMember
      isGroupOwner
      chatMessages {
        messageText 
        from 
      }
    }
  }
`

export const GET_HELP_WANTED_ADS = gql`
  query getHelpWantedAds {
          getHelpWantedAds{
            group{
              _id
              groupName
            }
            _id
            title
            description
          }
        }
`
;
