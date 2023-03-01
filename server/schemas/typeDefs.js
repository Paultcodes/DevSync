const { gql } = require('apollo-server-express');

//! Ask about adding Tasks to group type and chat messages to Group type

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    profilePicture: String
    githubProfile: String
    title: String
    aboutMe: String
    skills: [String]
    invites: [Invite]
    ownedGroups: [ID]
    groupsAsMember: [ID]
  }

  type userGroups {
    owned: [Group]
    groupAsMember: [Group]
  }

  type Tags {

  }

  type Message {
    messageText: String 
    to: String 
    from: String 
  }

  type Invite {
    date: Date 
    user: User 
    status: InviteStatus 
  }

  union InviteStatus = 'pending' | 'accepted' | 'declined'

  type Member {
    user: User 
  }

  type Group {
    groupName: String 
    type: String 
    owner: String 
    members: [Member]
    invites: [Invite]
    tags: [String]
    chatMessages: [Message]
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
    createUser(username: String!, email: String!, password: String!, profilePicture: String!): Auth 
    login(email: String!, password: String!): Auth 
    createGroup(groupName: String!, type: String!, owner: String!): User
  }
`;

module.exports = typeDefs;
