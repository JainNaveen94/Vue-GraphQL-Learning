const mongoose = require("mongoose");
// Generate Random Avatar Number
const md5 = require("md5");
// Used to Generate Hash Code Against Password
const bcrypt = require("bcrypt");

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
    ref: "post",
  },
});

/** Used to Generate the Avatar For User */
UserSchema.pre("save", (next) => {
  this.avatar = `http://gravtar.com/avatar/${md5(this.username)}?d=identicon`;
  next();
});

/** Used to Encyrpt Password Before Save */
UserSchema.pre("save", (next) => {
  // Check if the Entry is new or old
  if (!this.isModified("password")) {
    return next();
  }
  // Perform Encryption of Password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
