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
        members
        tags 
      }
      invites {
        _id 
        status
        group {
          _id
          groupName 
        }
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
      members {
        _id 
        username 
        email
      }
      isMember
      isGroupOwner
      chatMessages {
        messageText 
        from 
        timestamp
      }
      tasks {
        assignee
        description
        type
      }
      tags 
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

export const SEARCH_GROUP_BY_TAG = gql`
 query searchGroupByTag($tags: [String!]!) {
  searchGroupByTag(tags: $tags) {
    _id 
    groupName
  }
 }

`