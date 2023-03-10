const { User, Group, HelpWanted } = require('../models');
const { signToken } = require('../utils/auth');
const { errorMessage } = require('./ErrorMessages');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate([
          { path: 'ownedGroups' },
          { path: 'invites.group' },
        ]);
        return user;
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    getProfile: async (parent, { userId }) => {
      return await User.findOne({ _id: userId });
    },

    getAllOpenGroups: async (parent, args, context) => {
      if (context.user) {
        return await Group.find({ type: 'open' });
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    getGroup: async (parent, { groupId }, context) => {
      const getGroup = await Group.findOne({ _id: groupId }).populate(
        'members'
      );

      if (!getGroup) {
        throw new Error('Group not found');
      }

      const user = await User.findOne({ _id: context.user._id });

      const isGroupOwner = user.ownedGroups.some((group) =>
        group._id.equals(groupId)
      );

      const isMember = user.groupsAsMember.some((group) =>
        group._id.equals(groupId)
      );

      return { ...getGroup.toObject(), isMember, isGroupOwner };
    },

    searchGroupByTag: async (parent, { tags }, context) => {
      const query = { tags: { $in: tags }, type: "open" };
    
      try {
        const groups = await Group.find(query).exec();
        console.log(groups);
        return groups;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to search for groups');
      }
    },

    getAllUsers: async () => {
      return await User.find({});
    },

    getHelpWantedAds: async () => {
      return await HelpWanted.find({}).populate('group');
    },

    searchGroupName: async (parent, { groupName }, context) => {
      if (context.user) {
        return await Group.findOne({ groupName: groupName, type: 'open' });
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    searchUser: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username: username });
      }
      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },
  },

  Mutation: {
    createUser: async (
      parent,
      { username, email, password, firstName, lastName }
    ) => {
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError(errorMessage.incorrectUsername);
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(errorMessage.incorrectPassword);
      }

      const token = signToken(user);
      return { token, user };
    },

    createGroup: async (parent, { groupName, type }, context) => {
      if (context.user) {
        const newGroup = await Group.create({
          groupName,
          type,
          owner: context.user._id,
        });

        if (newGroup) {
          await Group.findOneAndUpdate(
            { _id: newGroup._id },
            { $push: { members: context.user._id } },
            { new: true }
          );
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $push: {
                ownedGroups: newGroup._id,
                groupsAsMember: newGroup._id,
              },
            },
            { new: true }
          );

          return updatedUser;
        }
      }

      throw new AuthenticationError(errorMessage.needToBeLoggedIn);
    },

    updateUsername: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { username: username }
        );
      }
    },

    addTagsToUser: async (_, { tag }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { skills: tag } }
        );
      }
    },

    createHelpWanted: async (
      parent,
      { groupId, title, description },
      context
    ) => {
      if (context.user) {
        return await HelpWanted.create({ group: groupId, title, description });
      }
    },

    inviteUserToGroup: async (_, { userId, groupId }, context) => {
      if (context.user) {
        const group = await Group.findOne({ _id: groupId });

        const isMember = group.members.some((member) =>
          member._id.equals(userId)
        );

        if (isMember) {
          throw new Error('User is already a member of this group');
        } else {
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { invites: { group: groupId } } },
            { new: true }
          );
          return updatedUser;
        }
      }
    },

    createMessage: async (parent, { messageText, groupId }, context) => {
      if (context.user) {
        const updatedGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          {
            $push: {
              chatMessages: {
                messageText: messageText,
                from: context.user.username,
              },
            },
          },
          { new: true }
        );
        return updatedGroup;
      }
    },

    inviteResponse: async (
      parent,
      { response, groupId, inviteId },
      context
    ) => {
      if (context.user) {
        if (response === 'accept') {
          await Group.findOneAndUpdate(
            { _id: groupId },
            { $push: { members: context.user._id } },
            { new: true }
          );

          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $pull: { invites: { _id: inviteId } },
              $push: { groupsAsMember: groupId },
            },
            { new: true }
          );

          return user;
        } else {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { invites: inviteId } },
            { new: true }
          );
          return user;
        }
      }
    },

    createTask: async (
      parent,
      { assignee, description, type, groupId },
      context
    ) => {
      if (context.user) {
        const updateGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          {
            $push: {
              tasks: {
                assignee: assignee,
                description: description,
                type: type,
              },
            },
          },
          { new: true }
        );
        return updateGroup;
      }
    },

    addMember: async (parent, { groupId }, context) => {
      if (context.user) {
        await Group.findOneAndUpdate(
          { _id: groupId },
          { $push: { members: context.user._id } },
          { new: true }
        );
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },

          { $push: { groupsAsMember: groupId } }
        );

        return updateUser;
      }
    },

    addTagsToGroup: async (_, { groupId, tags }) => {
      try {
        const group = await Group.findOneAndUpdate(
          { _id: groupId },
          { $set: { tags: tags } },
          { new: true }
        );
        return group;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
