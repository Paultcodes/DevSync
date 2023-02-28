
const {User, Group, Message, Invite } = require ('../models')
const {signToken} = require('../utils/auth')
const {AuthenticationError} = require("apollo-server-express")

const resolvers = {
    Query: {
        getSingleUser: async (parent, {user}) => {
            return await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
              });
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username: username, email: email, password: password});
            const token = signToken(user)
            return {user, token}
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError("incorrect credentials")
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError("incorrect credentials")
            }
            const token = signToken(user);
            return {token, user}
        }
    }
}

module.exports = resolvers

