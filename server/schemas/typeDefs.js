const { gql } = require('apollo-server-express');

//! Ask about adding Tasks to group type and chat messaged to Group type 

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
    invites: [ID]
    ownedGroups: [ID]
    groupsAsMember: [ID]
  }

  type Group {
    groupName: String 
    type: String 
    owner: String 
    members: [ID]
    invites: [ID]
    tags: [String]
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
