import { TryCatch } from "../middleware/error.js";
import { NextFunction, Request, Response } from "express";
import { Role } from "../models/roleModel.js";
import { NewRoleType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";

export const addRole = TryCatch(
  async (
    req: Request<{}, {}, NewRoleType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description } = req.body;

    if (!name || !description) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    const role = await Role.findOne({ name });

    if (!role) {
      const data = await Role.create({
        name,
        description,
      });

      res.status(200).json({
        success: true,
        data,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "record already exists",
      });
    }
  }
);

export const getAllRoles = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Role.find({});
    res.status(200).json({
      success: true,
      data,
    });
  }
);
