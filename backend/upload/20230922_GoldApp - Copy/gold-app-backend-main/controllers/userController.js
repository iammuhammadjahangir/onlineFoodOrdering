const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailSent = require("./uniqueKeyandEmailSender");

const userModel = require("../models/userModel");
const { userSignUpSchema } = require("../validations/Uservalidation");
const { userLoginSchema } = require("../validations/Uservalidation");
const roleModel = require("../models/userRolesModel");
const roleTasksModel = require("../models/userRoleTasksModel");
require("dotenv").config();
exports.signin = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    console.log("d");
    // await userLoginSchema.validate(req.body);
    const emailAddress1 = emailAddress.toLowerCase();
    console.log("dd");

    console.log(emailAddress1);

    const existingUser = await userModel
      .findOne({ emailAddress1 })
      .populate("role");
    console.log("ddd");

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    console.log("dddd");

    const existingUser2 = await userModel.findOne({
      emailAddress1,
      isEmailVerified: "false",
      isUserVerified1: "false",
    });
    console.log("dddddd");

    if (existingUser2)
      return res.status(404).json({ message: "Email Not Verified." });

    const existingUser1 = await userModel.findOne({
      emailAddress1,
      isEmailVerified: "true",
      isUserVerified: "false",
    });
    if (existingUser1)
      return res.status(404).json({ message: "Not Verified by Admin." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.hashPassword
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    // console.log(existingUser.role.roleName);

    // Find the tasks associated with the user's role in the middle table
    console.log(existingUser.role._id);
    const roleTasks = await roleTasksModel
      .find({
        role: existingUser.role._id,
        status: true,
      })
      .populate("task");
    console.log(roleTasks);

    // Extract task names from the roleTasks
    const taskNames = roleTasks.map((roleTask) => roleTask.task.taskName);

    console.log(taskNames);
    if (!existingUser.role.roleName) {
      return res.status(400).json({ message: "User Role Issue" });
    }
    if (existingUser.role.roleName) {
      const token = jwt.sign(
        {
          emailAddress: existingUser.emailAddress1,
          id: existingUser._id,
          role: existingUser.role.roleName,
          permission: taskNames,
        },
        "test"
      );
      existingUser.hashPassword = "";
      res.status(200).json({ result: existingUser, taskNames, token });
    }
    // if (existingUser.role === "user") {
    //   console.log("userrrr");

    // } else if (existingUser.role === "admin") {
    //   console.log("adminnnn");
    //   const token = jwt.sign(
    //     {
    //       emailAddress: existingUser.emailAddress1,
    //       id: existingUser._id,
    //       role: "admin",
    //     },
    //     "test"
    //   );
    //   existingUser.hashPassword = "";
    //   res.status(200).json({ result: existingUser, token });
    // }
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

    // Check if the "user" roleTask exists in the roleTask collection
    let defaultRole = await roleModel.findOne({ roleName: "user" });
    console.log(defaultRole);
    if (!defaultRole) {
      // Handle the case where the "user" roleTask or the corresponding role doesn't exist
      const createRole = await roleModel.create({
        roleName: "user",
        roleDescription: "user",
      });
      console.log(createRole);
      defaultRole = createRole._id;
    }

    await userModel.create({
      emailAddress1,
      hashPassword,
      name: `${firstName} ${lastName}`,
      uniqueKey: key,
      role: defaultRole._id,
    });

    const htmlString = `<h2>Dear ${
      firstName + " " + lastName
    }</h2><br/>Thank you for joining us at Alkhair Jewels, please click <a href=${
      process.env.BASE_URL_BACKEND
    }/api/verify/${key}/>here </a> to verify your account. <br/> <br/> Please note that after your email verification, your request will be forwarded the application admin for approval. <br/> <h3>Thank You </h3>`;
    await EmailSent.sendEmail(
      emailAddress1,
      htmlString,
      "Account Verification"
    );

    res.status(200).json(`Verification Email Sent to ${emailAddress}`);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Something went wrong",
      e,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(400).json({
      isEmailVerified: true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Something went wrong",
      e,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const userAll = await userModel
      .find({
        isEmailVerified: true,
        isUserVerified: true,
      })
      .populate("role");

    res.status(200).json({
      userAll,
    });
  } catch (e) {
    res.status(400).json({
      message: "Something went wrong",
      e,
    });
  }
};

exports.ChangeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.query;

    const roleId = await roleModel.findOne({ roleName: role });
    // console.log(roleId);

    if (!roleId) {
      res.status(201).json({ message: "Role not exist" });
    }

    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      res.status(201).json({ message: "User not exist" });
    }

    user.role = roleId._id;
    await user.save();
    res.status(200).json({ message: "Role Updated" });

    // console.log(user);

    // console.log(userId);
    // console.log(role);

    // const userAll = await userModel
    //   .find({
    //     isEmailVerified: true,
    //     isUserVerified: true,
    //   })
    //   .populate("role");

    // res.status(200).json({
    //   userAll,
    // });
  } catch (e) {
    res.status(400).json({
      message: "Something went wrong",
      e,
    });
  }
};
