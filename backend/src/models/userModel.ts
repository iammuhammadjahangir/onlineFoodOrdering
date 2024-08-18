import mongoose, { Document, ObjectId } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NewUserRequestBody } from "../types/types.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should be greater than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.default.isEmail, "Please enter valid email"],
      unique: true,
    },
    avatar: {
      url: {
        type: String,
        required: [true, "please add your photo"],
      },
      blurHash: {
        type: String,
        required: [true, "Something went wrong in image"],
      },
    },
    password: {
      type: String,
      required: [true, "Please provide users password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter gender"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: [true, "Please provide a role for this user."],
      //   default: "user",
    },
    dob: {
      type: Date,
      required: [true, "Please enter date of birth"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    shopNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },
    printer: {
      type: String,
      enum: ["laser", "thermal"],
      default: "laser",
    },
    tableRows: {
      type: Number,
      default: 10,
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

    createdAt: {
      type: Date,
      default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token Authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Comapre Password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  // console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password reset Token Authentication
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding resetPasswordToken to Schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob: any = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<NewUserRequestBody>("User", userSchema);
