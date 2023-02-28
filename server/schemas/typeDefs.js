const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    ownedGroups: [Group]
    groupsAsMember: [Group]
    invites: [Invite]
}

type Group {
    groupName: String
    groupOwner: User
    members: [User]
    chatMessages: 
}

type Message{
    username: String
    date: Date
    message: String
}

type Invite{
    groupId: String
    user: 
}

type Query{
    getUser(userId: ID!): User
    getMessages(messageId: ID!): Message
    getGroup(GroupId: ID!): Group
}

type Mutation{
    createUser(username: String, email: String!, password: String!): Auth
    createMessage(messageText: String!, user: String, groupId: String!): Message
    createGroup(groupName: String!, owner: User!): Group
    createInvite(groupId: String!, groupName: String! userId: String!)
    login(email: String!, password: String!) : Auth
}
`

module.exports = typeDefs