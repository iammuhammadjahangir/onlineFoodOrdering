const User = require("../models/userModel");
const godownModel = require("../models/godownModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const userModel = require("../models/userModel");
const printerModel = require("../models/printerModel");
const tableSettingModel = require("../models/tableSettingModel");
const roleModel = require("../models/rolesModel");
//===========================================//
//======CONTROLLER TO Get All Userss =======//
//=========================================//
exports.getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  // console.log(users);
  res.json(users);
});

//============================================//
//======CONTROLLER TO Verify username =======//
//====and password for password change =====//
//=========================================//
exports.getVerifiedUser = asyncHandler(async (req, res) => {
  try {
    // Get all users from MongoDB
    const { usernameparams, password } = req.params;
    const users = await User.findOne({ username: usernameparams }).select(
      "+password"
    );
    console.log(users);
    console.log(users.password);
    const match = await bcrypt.compare(password, users.password);

    if (!match) return res.json({ message: "Unauthorized" });

    res.json({ message: "Verified" });
  } catch (error) {
    console.log(error);
  }
});

//========================================================//
//======CONTROLLER TO Get All Users with Populate =======//
//======================================================//
exports.getAllUsersWithPopulate = asyncHandler(async (req, res) => {
  // Get all users from MongoDB and populate the shopNo field with shop details

  try {
    const users = await User.find()
      .select("-password")
      .populate("shopNo")
      .populate("roles")
      .populate("tableRows");

    // If no users
    if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
    }

    // console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//========================================================//
//======CONTROLLER TO Get One Users with Populate =======//
//======================================================//
exports.getAllUsersWithPopulateWithId = asyncHandler(async (req, res) => {
  // Get all users from MongoDB and populate the shopNo field with shop details
  try {
    const userId = req.params.id;
    const users = await User.findOne({ _id: userId })
      .select("-password")
      .populate("shopNo")
      .populate("printerId")
      .populate("tableRows")
      .populate("roles");

    // console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//========================================================//
//======CONTROLLER TO Get One Users using username ======//
//======================================================//
exports.getOneUserWithUserName = asyncHandler(async (req, res) => {
  // Get all users from MongoDB and populate the shopNo field with shop details

  const userId = req.params.id;
  const users = await User.findOne({ username: userId })
    .select("-password")
    .populate("shopNo");

  // console.log(users);
  res.json(users);
});

//===========================================//
//=====CONTROLLER TO Create Users=======//
//=========================================//
exports.createNewUser = asyncHandler(async (req, res) => {
  let printerId = await printerModel.findOne({ status: "active" });
  let tableRows = await tableSettingModel.findOne({ noOfRows: 10 });
  console.log(printerId);
  const {
    name,
    username,
    password,
    roles,
    shopNo,
    // godownNo,
    email,
    posId,
    phoneNo,
    whatsappNo,
  } = req.body;

  console.log("cei");
  console.log(roles);
  // console.log(req.body)
  // Confirm data
  if (
    !name ||
    !username ||
    !password ||
    !roles ||
    !shopNo ||
    !printerId ||
    !tableRows ||
    !email ||
    // !godownNo ||
    !posId ||
    !phoneNo ||
    !whatsappNo
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds
  const roleid = await roleModel.findOne({ roleName: roles });

  const userObject = {
    name,
    username,
    password: hashedPwd,
    roles,
    shopNo,
    printerId,
    tableRows,
    email,
    // godownNo,
    posId,
    phoneNo,
    whatsappNo,
  };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

//===========================================//
//====CONTROLLER TO Update Users ==========//
//=========================================//
exports.updateUser = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    username,
    roles,
    active,
    password,
    shopNo,
    posId,
    phoneNo,
    whatsappNo,
  } = req.body;

  if (
    !id ||
    !name ||
    !username ||
    !Array.isArray(roles) ||
    !roles?.length ||
    typeof active !== "boolean" ||
    !shopNo ||
    !posId ||
    !phoneNo ||
    !whatsappNo
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.name = name;
  user.username = username;
  user.roles = roles;
  user.active = active;
  user.shopNo = shopNo;
  user.posId = posId;
  user.phoneNo = phoneNo;
  user.whatsappNo = whatsappNo;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

//===================================================//
//====CONTROLLER TO Update Users Password ==========//
//=================================================//
exports.updateUserPassword = asyncHandler(async (req, res) => {
  const { usernameparams } = req.params;
  const { password } = req.body;

  console.log(usernameparams, password);

  // Does the user exist to update?
  const user = await User.findOne({ username: usernameparams });

  console.log(user);

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `Password updated` });
});

//===========================================//
//===CONTROLLER TO Update Printer Id in Userss =======//
//=========================================//

exports.updateUserPrinterById = async (req, res) => {
  try {
    const { id } = req.params;
    const { printerId } = req.body;

    // Check if the ID and printerId are provided
    if (!id || !printerId) {
      return res
        .status(400)
        .json({ message: "Both 'id' and 'printerId' are required." });
    }
    console.log(id);
    // Perform the database update using Mongoose
    const result = await userModel.findByIdAndUpdate(
      id,
      { printerId: printerId },
      { new: true } // Return the updated document
    );
    console.log(result);
    // Check if the record was updated
    if (result) {
      return res.json({ message: "Record updated successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "Record not found or not updated" });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  }
};

//===========================================//
//===CONTROLLER TO Get Delete Userss =======//
//=========================================//
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

// //=============================================================//
// //======CONTROLLER TO GET active and total users =============//
// //===========================================================//

exports.getTotalAndActiveUsers = async (req, res) => {
  try {
    const activeUsers = await User.countDocuments({ active: "true" });
    const totalUsers = await User.countDocuments();

    res.json({ activeUsers, totalUsers });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getUserDetails = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.user.id)
    // console.log(req.user.shopId)
    const user = await User.findById(req.user.id)
      .populate("shopNo")
      .populate("printerId")
      .populate("tableRows")
      .populate("roles");
    // console.log(user)
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  try {
    // Get the current user from the request (you may have a middleware to extract the user)
    // console.log(req.user)
    const user = req.user;
    // console.log(user)
    if (!user) {
      return res.status(401).json("Unauthorized");
    }

    const godowns = await godownModel.find({ shopId: user?.shopNo });
    let filteredGodowns = [];
    godowns.map((god) => {
      // console.log(god.storageCode)
      filteredGodowns.push(god.storageCode);
    });
    // console.log(filteredGodowns)
    // // Generate a new token with an extended expiration time
    const token = user.getJWTToken();
    sendToken(user, filteredGodowns, 201, res);
    // console.log(token)
  } catch (error) {
    res.status(500).json({ err });
  }
});

/////// Forgot Password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User Not found");
    }

    /// Get reset password Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.BASE_URL_FRONTEND}/password/reset/${resetToken}`;

    const message = `Your reset Password Token is :- \n\n ${resetPasswordUrl} \n\n if you are not requested for it then please ignore it`;

    try {
      console.log("calli");
      await sendEmail({
        email: user.email,
        subject: `Qureshi Electronics Password Recovery`,
        message,
      });
      console.log("calii2");
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
      console.log("calii2");
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json(error.message);
    }
  } catch (error) {}
});

/// reset password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const filteredGodowns = [];
  const password = req.body.password;
  console.log(req.body.password);
  console.log(req.body.confirmPassword);
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json("Reset password token is invalid or has been expired");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json(`Password does not match`);
  }

  // user.password = req.body.password
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, filteredGodowns, 201, res);
});

exports.updateUserTableRowById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tableId } = req.body;

    // Check if the ID and printerId are provided
    if (!id || !tableId) {
      return res
        .status(400)
        .json({ message: "Both 'id' and 'printerId' are required." });
    }
    console.log(id);
    // Perform the database update using Mongoose
    const result = await userModel.findByIdAndUpdate(
      id,
      { tableRows: tableId },
      { new: true } // Return the updated document
    );
    console.log(result);
    // Check if the record was updated
    if (result) {
      return res.json({ message: "Record updated successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "Record not found or not updated" });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  }
};
