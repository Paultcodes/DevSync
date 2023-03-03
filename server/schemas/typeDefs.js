const { gql } = require('apollo-server-express');

//! Ask about adding Tasks to group type and chat messages to Group type

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String 
    lastName: String
    username: String
    email: String
    password: String
    profilePicture: String
    githubProfile: String
    title: String
    aboutMe: String
    skills: [String]!
    invites: [Invite]!
    ownedGroups: [testGroup]!
    groupsAsMember: [userGroups]!
  }

  type testGroup {
    _id: ID 
    groupName: String  

  }

  type userGroups {
    owned: [Group]!
    groupAsMember: [Group]!
  }

  type Tags {
    tag: String

  }

  type Message {
    messageText: String 
    to: String 
    from: String 
  }

  type Invite {
    date: String 
    user: User 
    status: String
  }

  

  type Member {
    user: User 
  }

  type Group {
    groupName: String 
    type: String 
    owner: String 
    members: [Member]!
    invites: [Invite]!
    tags: [String]!
    chatMessages: [Message]!
  }

  type Auth {
    token: ID! 
    user: User 
  }

  type Query {
    me: User 
    getProfile: User 
    getAllOpenGroups: Group 
    getSingleGroup: Group 
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth 
    login(email: String!, password: String!): Auth 
    createGroup(groupName: String!, type: String!): User
  }
`;

module.exports = typeDefs;
