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
    invites: [ReceivedInvite]!
    ownedGroups: [testGroup]!
    groupsAsMember: [testGroup]!
  }

  type testGroup {
    _id: ID 
    groupName: String  
    members:[ID]!


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
    from: String 
    timestamp: String
  }

  type ReceivedInvite {
    _id: ID 
    group: Group  
    status: String 

  }

  type Invite {
    group: String 
    user: User 
    status: String
  }

  type HelpWanted {
    _id: ID 
    group: Group 
    title: String 
    description: String 
  }

  type Task {
    assignee: String
    description: String
    type: String
  }

  

  

  type Member {
    user: User 
  }

  type Group {
    _id: ID 
    groupName: String 
    type: String 
    owner: String 
    members: [User]!
    invites: [Invite]!
    tags: [String]!
    tasks: [Task]!
    chatMessages: [Message]!
    isMember: Boolean
    isGroupOwner: Boolean 
  }

  type Auth {
    token: ID! 
    user: User 
  }

  type Query {
    me: User 
    getProfile(userId: ID!): User 
    getAllOpenGroups: Group 
    getSingleGroup: Group 
    getAllUsers: [User]!
    searchGroupName(groupName: String!): Group
    searchUser(username: String!): User 
    getGroup(groupId: ID!): Group!
    getHelpWantedAds: [HelpWanted]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth 
    login(username: String!, password: String!): Auth 
    createGroup(groupName: String!, type: String!): User
    updateUsername(username: String!): User 
    addTagsToUser(tag: String!): User
    createTask(assignee: String!, description: String!, type: String!, groupId: ID!): Group 
    inviteUserToGroup(groupId: ID!, userId: ID!): User 
    createHelpWanted(groupId: ID!, title: String!, description: String!): HelpWanted
    createMessage(messageText: String!, groupId: ID!): Group 
    inviteResponse(response: String!, groupId: ID!, inviteId: ID!): User 
    addMember(groupId: ID!): User
    addTagsToGroup(groupId: ID!, tags: [String!]!): Group!
  }
`;

module.exports = typeDefs;
