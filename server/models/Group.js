const { Schema, model, default: mongoose } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    chatMessages: [
      {
        messageText: {
          type: String,
        },
        to: {
          type: String,
        },
        from: {
          type: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],

    invites: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        timestamp: { type: Date, default: Date.now },
      },
    ],

    tags: [
      {
        type: String,
      },
    ],

    tasks: [
      {
        assignee: {
          type: String,
        },
        description: {
          type: String
        },
        type: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Group = model('Group', groupSchema);

module.exports = Group;
