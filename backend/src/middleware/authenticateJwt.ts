//for token and user login authentication
import jwt from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import { NextFunction } from "express";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  console.log("ewlkjewhj");
  const { token } = req.cookies;
  console.log(req.cookies);
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET!);
  //   req.User = await User.findById(decodeData.id);

  next();
});

export const authorizeRole = (...roles: string[]) => {
  return TryCatch(async (req, res, next) => {
    const { token } = req.cookies;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decodedData.id).populate("role");
    console.log(user?.role.name);

    if (!roles.includes(String(user?.role.name))) {
      return next(
        new ErrorHandler(
          `Role: ${user?.role.name} is not allowed to access this Resource`,
          403
        )
      );
    }

    next();
  });
};
