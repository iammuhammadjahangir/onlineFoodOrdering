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
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
});
const userModel = mongoose.model("userData", userSchema, "userData");
module.exports = userModel;
