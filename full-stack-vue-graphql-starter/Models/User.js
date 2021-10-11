const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  /** For Populate Method in Resolver
   * property ('favorites') = path
   * ref 'Post' = model
   */
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    requiredd: true,
    ref: 'post'
  },
});

module.exports = mongoose.model('User', UserSchema);
