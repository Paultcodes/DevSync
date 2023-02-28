const { Schema, model, default: mongoose } = require('mongoose');

const helpWantedSchema = new Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },

  description: {
    type: String,
  },

  groupName: {
    type: String,
  },

  groupId: {
    type: String,
  },

  tags: [
    {
      type: String,
    },
  ],
});

const HelpWanted = model('HelpWanted', helpWantedSchema);

module.exports = HelpWanted;
