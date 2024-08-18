import { TryCatch } from "../middleware/error.js";
import { NextFunction, Request, Response } from "express";
import { Task } from "../models/taskModel.js";
import { AssignTask } from "../models/assignTaskModel.js";
import { NewAssignedTaskType, NewRoleType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";

export const assignRole = TryCatch(
  async (
    req: Request<{}, {}, NewAssignedTaskType>,
    res: Response,
    next: NextFunction
  ) => {
    const { role, task, status } = req.body;

    if (!role || !task) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    const assignedRole = await AssignTask.findOne({ role, task });
    const statusBool = status === true ? true : false;

    if (!assignedRole) {
      console.log("No role assigned");
      await AssignTask.create({
        role,
        task,
        status: statusBool,
      });
      return res.status(201).json({
        success: true,
        message: "Permission Added",
      });
    } else {
      assignedRole.status = status;
      let result = await assignedRole.save();

      return res.status(201).json({
        success: true,
        message: "Permission Updated",
      });
    }
  }
);

export const getAllAssignedRoles = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await AssignTask.find({});
    return res.status(200).json({
      success: true,
      data,
    });
  }
);
export const getOneAssignedRoleById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, task } = req.params;
    const data = await AssignTask.find({ role, task });
    return res.status(200).json({
      success: true,
      data,
    });
  }
);
export const getOneAssignedRoleByIdAndName = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.params;

    console.log("Role: " + role);

    if (!role || !req.query.taskName) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }
    console.log("task", req.query.taskName);

    const taskId = await Task.findOne({ name: req.query.taskName });

    console.log("TaskId", taskId);
    if (!taskId) {
      return res.status(200).json({
        success: false,
        message: "Invalid Task",
      });
    }

    const data = await AssignTask.find({ role: role, task: taskId._id });
    console.log("data", data);

    if (!data || data.length === 0) {
      return res.status(200).json({ status: false });
    } else {
      const status = data[0].status;
      return res.status(200).json({ status });
    }
  }
);

export const getOnlyAllowedTasks = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.params;
    if (!role) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }
    const populatedTasks = await AssignTask.find({
      role,
      status: true,
    }).populate("task");
    if (!populatedTasks) {
      return res.status(200).json({ message: "No Task Added" });
    }

    // Extract task names to a separate array
    const taskNamesArray = populatedTasks.map(
      (taskObject: any) => taskObject.task?.name
    );
    if (!taskNamesArray) {
      return res
        .status(200)
        .json({ success: true, message: "No Task Assigned" });
    } else {
      return res.status(200).json({ success: true, taskNamesArray });
    }
  }
);
