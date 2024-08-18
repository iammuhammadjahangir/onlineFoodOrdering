import { NextFunction, Request, Response } from "express";
import { Branch } from "../models/branchModel.js";
import { newBranchType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import { User } from "../models/userModel.js";
import { WareHouse } from "../models/warehouseModel.js";
import { TryCatch } from "../middleware/error.js";
import { IncrementValuesFunction } from "../middleware/utils.js";

// Create a new branch
export const createBranch = TryCatch(
  async (
    req: Request<{}, {}, newBranchType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      // branchCode,
      branchAddress,
      branchDescription,
      branchType,
      warehouseId,
      branchTiming,
      branchSettings,
      customerSupport,
      activityStatus,
    } = req.body;

    // Validate required fields
    if (!branchAddress || !branchDescription) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const branchCode = await IncrementValuesFunction(
      "branchautoval",
      "BR00",
      "001" // Convert number to string with leading zeros
    );

    // Check if branch code already exists
    const existingBranch = await Branch.findOne({ branchCode });
    if (existingBranch) {
      return next(new ErrorHandler("Branch code already exists", 400));
    }

    // Create new branch
    const newBranch = await Branch.create({
      branchCode,
      branchAddress,
      branchDescription,
      branchType,
      warehouseId,
      branchTiming,
      branchSettings,
      customerSupport,
      activityStatus: activityStatus !== undefined ? activityStatus : true,
    });

    res.status(201).json({
      success: true,
      data: newBranch,
    });
  }
);

// Get all branches
export const getAllBranches = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const branches = await Branch.find({}).populate("warehouseId");

    if (!branches.length) {
      return next(new ErrorHandler("No branches found", 404));
    }

    res.status(200).json({
      success: true,
      data: branches,
    });
  }
);

// Get branches by a specific filter (e.g., activity status)
export const getBranchesByFilter = TryCatch(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { active } = req.query;

    const query: any = {};
    if (active !== undefined) {
      query.activityStatus = active === "true";
    }

    const branches = await Branch.find(query).populate("warehouseId");

    if (!branches.length) {
      return next(
        new ErrorHandler("No branches found matching the criteria", 404)
      );
    }

    res.status(200).json({
      success: true,
      data: branches,
    });
  }
);

// Update a branch
export const updateBranch = TryCatch(
  async (
    req: Request<{ id: string }, {}, newBranchType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      // branchCode,
      branchAddress,
      branchDescription,
      branchType,
      warehouseId,
      branchTiming,
      branchSettings,
      customerSupport,
      activityStatus,
    } = req.body;

    // Validate required fields
    if (!branchAddress || !branchDescription) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // Check if branch exists
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return next(new ErrorHandler("Branch not found", 404));
    }

    // const branchCode = await IncrementValuesFunction("branchautoval", "");

    // // Check if branch code is being updated and if it already exists
    // if (branchCode !== branch.branchCode) {
    //   const existingBranch = await Branch.findOne({ branchCode });
    //   if (existingBranch) {
    //     return next(new ErrorHandler("Branch code already exists", 400));
    //   }
    // }

    // Update branch
    const updatedBranch = await Branch.findByIdAndUpdate(
      req.params.id,
      {
        // branchCode,
        branchAddress,
        branchDescription,
        branchType,
        warehouseId,
        branchTiming,
        branchSettings,
        customerSupport,
        activityStatus:
          activityStatus !== undefined ? activityStatus : branch.activityStatus,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBranch) {
      return next(new ErrorHandler("Branch not updated", 404));
    }

    res.status(200).json({
      success: true,
      data: updatedBranch,
    });
  }
);

// Update branch activity status only
export const updateBranchStatus = TryCatch(
  async (
    req: Request<{ id: string }, {}, { activityStatus: boolean }>,
    res: Response,
    next: NextFunction
  ) => {
    const { activityStatus } = req.body;

    // Validate activityStatus field
    if (activityStatus === undefined) {
      return next(new ErrorHandler("Please provide activity status", 400));
    }

    // Check if branch exists
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return next(new ErrorHandler("Branch not found", 404));
    }

    // Update branch activity status
    branch.activityStatus = activityStatus;
    await branch.save();

    res.status(200).json({
      success: true,
      message: "Branch status updated successfully",
      data: branch,
    });
  }
);

// Delete a branch
export const deleteBranch = TryCatch(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const branchId = req.params.id;

    // Check if branch exists
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return next(new ErrorHandler("Branch not found", 404));
    }

    // Check if branch is referenced by other records
    const hasReference = await User.exists({ branchId });
    if (hasReference) {
      return next(
        new ErrorHandler(
          "Cannot delete branch as it is referenced by other records",
          400
        )
      );
    }

    // Delete branch
    await branch.deleteOne();
    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  }
);

// Get a branch by ID
export const getBranchById = TryCatch(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const branchId = req.params.id;

    // Find branch by ID and populate warehouse details
    const branch = await Branch.findById(branchId).populate("warehouseId");
    if (!branch) {
      return next(new ErrorHandler("Branch not found", 404));
    }

    res.status(200).json({
      success: true,
      data: branch,
    });
  }
);
