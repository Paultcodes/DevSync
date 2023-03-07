const { Schema, model, default: mongoose } = require('mongoose');

const helpWantedSchema = new Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },

  title: {
    type: String,
  },

  description: {
    type: String,
  },
});

const HelpWanted = model('HelpWanted', helpWantedSchema);

module.exports = HelpWanted;
