const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },

    profilePicture: {
      type: String,
    },

    githubProfile: {
      type: String,
    },

    title: {
      type: String,
    },

    aboutMe: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    invites: [
      {
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
        timestamp: { type: Date, default: Date.now },
        status: { type: String, default: 'pending' },
      },
    ],

    ownedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],

    groupsAsMember: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  },
  { toJSON: { virtuals: true } }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
