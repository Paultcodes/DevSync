const { User, Group, HelpWanted } = require('../models');
const { signToken } = require('../utils/auth');
const { errorMessage } = require('./ErrorMessages');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    getProfile: async (parent, { id }, context) => {
      if (context.user) {
        return await User.findOne({ _id: id });
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    getAllOpenGroups: async (parent, args, context) => {
      if (context.user) {
        return await Group.find({type: 'open'});
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    getSingleGroup: async (parent, { id }, context) => {
      if (context.user) {
        return await Group.findOne({ _id: id });
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },
  },

  

  Mutation: {
    createUser: async (parent, { username, email, password, profilePicture }) => {
      const user = await User.create({
        username,
        email,
        password,
        profilePicture,
      });

      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(errorMessage.incorrectEmail);
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(errorMessage.incorrectPassword);
      }

      const token = signToken(user);
      return { token, user };
    },

    createGroup: async (parent, { groupName, type, owner }, context) => {
      if (context.user) {
        const newGroup = await Group.create({ groupName, type, owner });

        if (newGroup) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { ownedGroups: newGroup._id } },
            { new: true }
          );

          return updatedUser;
        }
      }

      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },
  },
};

module.exports = resolvers;
