import { TryCatch } from "../middleware/error.js";
import { NextFunction, Request, Response } from "express";
import { Task } from "../models/taskModel.js";
import { NewTaskType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";

export const addTasks = TryCatch(
  async (
    req: Request<{}, {}, NewTaskType>,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.body);
    const { name, description } = req.body;

    if (!name || !description) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    const data = await Task.create({
      name,
      description,
    });

    res.status(200).json({ data });
  }
);

export const getAllTasks = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Task.find({});
    res.status(200).json({ data });
  }
);
