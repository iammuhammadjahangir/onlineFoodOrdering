const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
  active: {
    type: String,
    default: "true",
  },
  shopNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop",
  },
  //   godownNo: [
  //     {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "godown",
  //   }
  // ],
  printerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "printer",
  },
  tableRows: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tableSetting"
  },
  posId: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  whatsappNo: {
    type: String,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

///*** compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

//// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and Adding to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
