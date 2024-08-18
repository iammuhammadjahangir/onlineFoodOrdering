const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailSent = require("./uniqueKeyandEmailSender");

const userModel = require("../models/userModel");
const { userSignUpSchema } = require("../validations/Uservalidation");
const { userLoginSchema } = require("../validations/Uservalidation");
require("dotenv").config();
exports.signin = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    console.log("d");
    // await userLoginSchema.validate(req.body);
    const emailAddress1 = emailAddress.toLowerCase();
    console.log("dd");

    console.log(emailAddress1);

    const existingUser = await userModel.findOne({ emailAddress1 });
    console.log("ddd");
    console.log(existingUser);

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: true, message: "User doesn't exist." });
    }
    console.log("dddd");

    // const existingUser2 = await userModel.findOne({
    //   emailAddress1,
    //   isEmailVerified: "false",
    //   isUserVerified1: "false",
    // });
    // console.log("dddddd");

    // if (existingUser2)
    //   return res.status(404).json({ message: "Email Not Verified." });

    // const existingUser1 = await userModel.findOne({
    //   emailAddress1,
    //   isEmailVerified: "true",
    //   isUserVerified: "false",
    // });
    // if (existingUser1)
    //   return res.status(404).json({ message: "Not Verified by Admin." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.hashPassword
    );
    console.log(isPasswordCorrect);
    console.log("sds");

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    console.log("sdssss");

    existingUser.hashPassword = "";
    console.log("sdssds");

    res.status(200).json({ success: true, result: existingUser });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, emailAddress, password, confirmPassword } =
    req.body;
  try {
    await userSignUpSchema.validate(req.body);
    console.log("ddfd");
    const emailAddress1 = emailAddress.toLowerCase();

    const existingUser = await userModel.findOne({ emailAddress1 });

    if (existingUser)
      return res.status(400).json({ message: "Email already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't matched." });

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const key = EmailSent.UniqueKey();

    await userModel.create({
      emailAddress1,
      hashPassword,
      name: `${firstName} ${lastName}`,
      uniqueKey: key,
    });

    res.status(200).json(`Verification Email Sent to ${emailAddress}`);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Something went wrong",
      e,
    });
  }
};
