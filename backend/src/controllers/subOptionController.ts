import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { SubOption } from "../models/subOptionModel.js";
import { NewSubOptionType, SubOptionType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import { Item } from "../models/itemsModel.js";
import { Branch } from "../models/branchModel.js";
import { IncrementValuesFunction } from "../middleware/utils.js";

export const newSubOption = TryCatch(
  async (
    req: Request<{}, {}, SubOptionType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, items, isRequired, itemID } = req.body;
    if (!name || !items || !itemID) {
      return next(new ErrorHandler("Please Provide the details", 400));
    }
    console.log(items);
    const varData: NewSubOptionType = {
      name,
      items: items,
      itemID,
    };
    if (isRequired) varData.isRequired = isRequired;

    const potentialVariations = await SubOption.find({
      name,
      // description,
      isRequired,
      itemID,
    });

    let existingVariation = null;

    for (const variation of potentialVariations) {
      if (
        variation.items.length === items.length &&
        variation.items.every(
          (item, index) =>
            item.name === items[index].name && item.price === items[index].price
        )
      ) {
        existingVariation = variation;
        break;
      }
    }

    if (existingVariation) {
      return next(
        new ErrorHandler("Sub Options with the same fields already exists", 400)
      );
    } else {
      const subOptionCode = await IncrementValuesFunction(
        "subOptionVal",
        "Choice",
        "001" // Convert number to string with leading zeros
      );
      const branches = await Branch.find({}).select("id");
      let newArrayBranches: any = [];
      if (branches) {
        // Loop through each branch and create a new item
        newArrayBranches = branches.map((branch) => branch._id);
      }
      varData.branchID = newArrayBranches;
      varData.id = subOptionCode;
      await SubOption.create(varData);

      return res.status(201).json({
        success: true,
        message: "Sub Options created successfully",
      });
    }
  }
);

// 1. Get All SubOptions
export const getAllSubOptions = TryCatch(
  async (req: Request, res: Response) => {
    const subOptions = await SubOption.find().populate("itemID branchID");
    return res.status(200).json({
      success: true,
      subOptions,
    });
  }
);

// 2. Get SubOptions by ID, Branch, Item, or all of them at the same time
export const getSubOptionByCriteria = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, branchID, itemID } = req.query;

    if (!id && !branchID && !itemID) {
      return next(
        new ErrorHandler(
          "Please provide at least one search criteria: id, branchID, or itemID",
          400
        )
      );
    }

    const query: any = {};
    if (id) query.id = id;
    if (branchID) query.branchID = branchID;
    if (itemID) query.itemID = itemID;

    const subOptions = await SubOption.find(query).select("-itemID -branchID");
    // .populate("itemID branchID");

    if (!subOptions || subOptions.length === 0) {
      return next(
        new ErrorHandler("No SubOption found with provided criteria", 404)
      );
    }

    return res.status(200).json({
      success: true,
      subOptions,
    });
  }
);

// 3. Update SubOption by ID
export const updateSubOptionById = TryCatch(
  async (
    req: Request<{ subOptionId: string }, {}, SubOptionType>,
    res: Response,
    next: NextFunction
  ) => {
    const { subOptionId } = req.params;
    const updateData = req.body;
    const { name, items, isRequired, itemID } = req.body;
    if (!name || !items || !itemID) {
      return next(new ErrorHandler("Please Provide the details", 400));
    }

    const subOption = await SubOption.findById(subOptionId);

    if (!subOption) {
      return next(new ErrorHandler("SubOption not found", 404));
    }

    Object.assign(subOption, updateData);

    await subOption.save();

    return res.status(200).json({
      success: true,
      message: "SubOption updated successfully",
      subOption,
    });
  }
);

// 4. Delete SubOption by ID
export const deleteSubOptionById = TryCatch(
  async (
    req: Request<{ subOptionId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { subOptionId } = req.params;

    const subOption = await SubOption.findById(subOptionId);

    if (!subOption) {
      return next(new ErrorHandler("SubOption not found", 404));
    }

    await subOption.deleteOne();

    return res.status(200).json({
      success: true,
      message: "SubOption deleted successfully",
    });
  }
);
