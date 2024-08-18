const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  hashPassword: {
    type: String,
    required: true,
  },
  emailAddress1: {
    type: String,
    required: true,
    trim: true,
  },
  uniqueKey: {
    type: Number,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isUserVerified: {
    type: Boolean,
    default: false,
  },
});
const userModel = mongoose.model("user", userSchema, "user");
module.exports = userModel;
