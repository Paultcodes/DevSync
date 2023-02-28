
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

type message{
    username: String
    date: Date
    message: String
}
`

module.exports = typeDefs



