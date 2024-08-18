import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import jwt from "jsonwebtoken";
import {
  NewUserData,
  NewUserRequestBody,
  ProfileRequest,
  ProfiledRequest,
} from "../types/types.js";
import { sendToken } from "../utils/jwtToken.js";
import { User } from "../models/userModel.js";
import { rm } from "fs";
import ErrorHandler from "../utils/errorClassHandler.js";
import { Role } from "../models/roleModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import fs from "fs";
import { encodeImageToBlurhash } from "../middleware/encodingImage.js";
import { compressImage } from "../middleware/multer.js";

export const registerUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      email,
      password,
      dob,
      gender,
      role,
      active,
      phoneNo,
      whatsappNo,
      printer,
      tableRows,
      shopNo,
      posId,
    } = req.body;
    console.log("here");
    console.log(req.body);

    const photo = req.file;
    console.log(photo);

    if (!photo) return next(new ErrorHandler("Please Add Photo", 400));

    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !gender ||
      !phoneNo ||
      !whatsappNo ||
      !shopNo ||
      !role
    ) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    // let role = await Role.findOne({ name: "user" });
    // if (!role) {
    //   role = await Role.create({ name: "user", description: "user" });
    // }

    //Create a blur Hash of the Image
    // const blurHash = await encodeImageToBlurhash(photo.path);

    // Process images
    const { path } = req.query;
    const uploadPath = `upload/${path}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Compress each uploaded image
    const compressedImages = await compressImage(photo, uploadPath);

    const blurHash = await encodeImageToBlurhash(compressedImages.path);

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        url: compressedImages.path,
        blurHash: blurHash,
      },
      dob,
      gender,
      role: role,
      active,
      phoneNo,
      whatsappNo,
      printer,
      tableRows,
      shopNo,
      posId,
    });

    // sendToken(user, 201, res);
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  }
);

//For Login
export const loginUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please Provide credentials", 400));
    }

    const userdata = await User.findOne({ email })
      .select("+password")
      .populate({
        path: "shopNo",
        populate: {
          path: "wareHouseId", // Add more nested fields as needed
        },
      })
      .populate("role");

    console.log(userdata);

    if (!userdata || userdata === null) {
      console.log("enr");
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatch = await userdata.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email or password", 401));
    }

    if (userdata.role.name === "Others") {
      return next(new ErrorHandler("You Are not Allowed to Login", 401));
    }
    console.log(userdata);
    console.log(typeof userdata);

    if (
      userdata.active === false ||
      !userdata.active ||
      userdata.active.toString() === "false"
    ) {
      return next(new ErrorHandler("You Account Has been Disabled", 401));
    }

    userdata.password = "";
    userdata.resetPasswordExpire = undefined;
    userdata.resetPasswordToken = undefined;

    sendToken(userdata, 200, res);
  }
);

export const logoutUser = TryCatch(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Forget Password
export const forgetPassword = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    //Get reset password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    console.log(process.env.FRONTEND_URL_ADMIN);
    //req.protocol}://${req.get("host")
    ///api/user
    // const resetPasswordUrl = `<a>${process.env.FRONTEND_URL}/password/reset/${resetToken}</a>`;
    const resetPasswordUrl = `<a href="${process.env.FRONTEND_URL_ADMIN}/password/reset/${resetToken}">Click here to Reset Password</a>`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then ,Please ignore it...`;

    try {
      await sendEmail({
        email: user.email,
        subject: `${process.env.SMTP_MAIL_SUBJECT}`,
        resetPasswordUrl,
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email send to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler("Something went Wrong", 500));
    }
  }
);

//for Reset Password
export const resetPassword = TryCatch(async (req, res, next) => {
  //Hashing and adding resetPasswordToken
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log(user);
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  } else {
    if (user.role.name === "Others") {
      return next(new ErrorHandler("You Are not Allowed to Login", 401));
    }

    if (user.active === false || !user.active) {
      return next(new ErrorHandler("You Account Has been Disabled", 401));
    }
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does't Match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  //for login
  sendToken(user, 200, res);
});

//get User Details
export const getUserDetails = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const { id } = decodedData;
    const user = await User.findById(id)
      .populate({
        path: "shopNo",
        populate: {
          path: "wareHouseId", // Add more nested fields as needed
        },
      })
      .populate("role");
    res.status(200).send({
      status: true,
      user,
    });
  }
);

//Update User Password
export const updatePassword = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const { id } = decodedData;
    const user = await User.findById(id)
      .select("+password")
      .populate({
        path: "shopNo",
        populate: {
          path: "wareHouseId", // Add more nested fields as needed
        },
      })
      .populate("role");
    if (!user) {
      return next(new ErrorHandler("User not exist ", 404));
    }
    // console.log(user);
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Old Password is inCorrect", 400));
    }

    // console.log(req.body.oldPassword);
    // console.log(req.body.newPassword);
    // console.log(req.body.confirmPassword);
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not matched", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
  }
);

//Update User Profile
export const updateProfile = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.cookies;
    console.log(req.cookies);
    console.log(token);

    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const { id } = decodedData;
    const user = await User.findById(id).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not exist", 404));
    }
    const newUserData: NewUserData = {};

    if (req.file) {
      const photo = req.file;
      rm(user.avatar.url, () => {
        console.log("Deleted");
      });
      if (!newUserData.avatar) {
        newUserData.avatar = {
          url: photo.path,
          blurHash: await encodeImageToBlurhash(photo.path),
        };
      }
    }
    if (req.body.name) {
      newUserData.name = req.body.name;
    }
    if (req.body.email) {
      newUserData.email = req.body.email;
    }
    if (req.body.gender) {
      newUserData.gender = req.body.gender;
    }
    if (req.body.phoneNo) {
      newUserData.phoneNo = req.body.phoneNo;
    }
    if (req.body.whatsappNo) {
      newUserData.whatsappNo = req.body.whatsappNo;
    }
    if (req.body.shopNo) {
      newUserData.shopNo = req.body.shopNo;
    }
    if (req.body.printer) {
      newUserData.printer = req.body.printer;
    }
    if (req.body.tableRows) {
      newUserData.tableRows = req.body.tableRows;
    }
    if (req.body.posId) {
      newUserData.posId = req.body.posId;
    }

    await User.findByIdAndUpdate(user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
    });
  }
);

//get All User Details
export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({})
    .populate({
      path: "shopNo",
      populate: {
        path: "wareHouseId", // Add more nested fields as needed
      },
    })
    .populate("role")
    .select("-resetPasswordExpire")
    .select("-resetPasswordToken");

  res.status(200).send({
    success: true,
    users,
  });
});

//get Single User Details (ADMIN)
export const getSingleUser = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does not exist with id ${req.params.id}`, 400)
    );
  }

  res.status(200).send({
    success: true,
    user,
  });
});

//Update User Profile (ADMIN)
export const updateUserRole = TryCatch(async (req, res, next) => {
  // find old user to remove photo
  const userData = await User.findById(req.params.id)
    .populate({
      path: "shopNo",
      populate: {
        path: "wareHouseId", // Add more nested fields as needed
      },
    })
    .populate("role");
  if (!userData) {
    return next(new ErrorHandler("Something Went Wrong, User not exist", 404));
  }

  console.log("tested", req.body);

  const newUserData: NewUserData = {};
  if (req.file) {
    const photo = req.file;
    rm(userData.avatar.url, () => {
      console.log("Deleted");
    });
    if (!newUserData.avatar) {
      newUserData.avatar = {
        url: photo.path,
        blurHash: await encodeImageToBlurhash(photo.path),
      };
    }
    // console.log(newUserData);
    // console.log(photo.path);
    // console.log(userData.avatar.url);
    // newUserData.avatar!.url = photo.path;
    // console.log(photo.path);

    // console.log(newUserData);

    // newUserData.avatar!.blurHash = await encodeImageToBlurhash(photo.path);
    console.log(photo.path);
    console.log(await encodeImageToBlurhash(photo.path));
  }
  if (req.body.role) {
    newUserData.role = req.body.role;
  }
  if (req.body.name) {
    newUserData.name = req.body.name;
  }
  if (req.body.email) {
    newUserData.email = req.body.email;
  }
  if (req.body.gender) {
    newUserData.gender = req.body.gender;
  }
  if (req.body.phoneNo) {
    newUserData.phoneNo = req.body.phoneNo;
  }
  if (req.body.whatsappNo) {
    newUserData.whatsappNo = req.body.whatsappNo;
  }
  if (req.body.shopNo) {
    newUserData.shopNo = req.body.shopNo;
  }
  if (req.body.printer) {
    newUserData.printer = req.body.printer;
  }
  if (req.body.tableRows) {
    newUserData.tableRows = req.body.tableRows;
  }
  if (req.body.posId) {
    newUserData.posId = req.body.posId;
  }
  if (req.body.dob) {
    newUserData.dob = req.body.dob;
  }
  if (req.body.active) {
    newUserData.active = req.body.active;
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).send({
    success: true,
    message: "User updated successfully",
  });
});

//Delete User Profile (ADMIN)
export const deleteUser = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id ${req.params.id}`, 400)
    );
  }
  rm(user.avatar.url, () => {
    console.log("Deleted");
  });

  await user.deleteOne();

  res.status(200).send({
    success: true,
    message: "User Deleted Successfully",
  });
});

export const refreshToken = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    // console.log("token", token);
    if (!token || token === undefined) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    // console.log("after if condition");

    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // console.log("after decoded data", decodedData);

    const user: any = await User.findById(decodedData.id)
      .populate({
        path: "shopNo",
        populate: {
          path: "wareHouseId", // Add more nested fields as needed
        },
      })
      .populate("role");

    // console.log("user found", user);

    if (user.role.name === "Others") {
      return next(new ErrorHandler("You Are not Allowed to Login", 401));
    }
    // console.log(user);
    // console.log(typeof user);

    if (
      user.active === false ||
      !user.active ||
      user.active.toString() === "false"
    ) {
      return next(new ErrorHandler("You Account Has been Disabled", 401));
    }

    user.password = "";
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    sendToken(user, 200, res);
  }
);
