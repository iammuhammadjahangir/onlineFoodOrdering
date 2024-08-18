import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { Category } from "../models/categoryModel.js";
import { CategoryTypes } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import { Item } from "../models/itemsModel.js";
import moment from "moment-timezone";

// For Image
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { rm } from "fs";

import { checkImageValidation, compressImage } from "../middleware/multer.js";
import { encodeImageToBlurhash } from "../middleware/encodingImage.js";
import { Branch } from "../models/branchModel.js";

// Function to check if the category is available based on current time and day
const isCategoryAvailable = (category: any) => {
  const currentTime = moment().tz("Asia/Karachi");
  const currentDay = currentTime.format("ddd"); // Day of the week

  console.log("currentTime", currentTime);
  console.log("currentDay", currentDay);

  const availableFrom = moment(category.availableFrom, "HH:mm");
  const availableTo = moment(category.availableTo, "HH:mm");

  console.log("availableFrom", availableFrom);
  console.log("availableTo", availableTo);

  // Check if current time falls within available time range
  const isTimeAvailable = currentTime.isBetween(availableFrom, availableTo);

  console.log("isTimeAvailable", isTimeAvailable);

  // Check if current day is in the status array
  const isDayAvailable = category.status.includes(currentDay);
  console.log("isDayAvailable", isDayAvailable);

  return isTimeAvailable && isDayAvailable;
};

export const newCategory = TryCatch(
  async (
    req: Request<{}, {}, CategoryTypes>,
    res: Response,
    next: NextFunction
  ) => {
    const file = req.file;
    let image;
    let imageBlurHash;
    const {
      name,
      description,
      priority,
      availableFrom,
      availableTo,
      status,
      appOnly,
    } = req.body;
    if (!name || !description || !availableFrom || !availableTo || !status) {
      return next(
        new ErrorHandler(
          "Please provide all required fields for the category",
          400
        )
      );
    }

    if (req.file) {
      console.log("req.file", req.file);
      // Process images
      const { imgPath } = req.query;
      const uploadPath = `upload/${imgPath}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      image = await compressImage(req.file, uploadPath);
      imageBlurHash = await encodeImageToBlurhash(image.path);
    }

    if (image) {
      checkImageValidation(
        image,
        400, // maxHeight
        400, // maxWidth
        200 * 1024, // maxSize
        next //  Next Function
      ).catch((error) => {
        console.error(error.message);
      });
    }

    const isExist = await Category.exists({ name: name });
    if (isExist) {
      return next(new ErrorHandler("Category already exist", 400));
    } else {
      // Search for Branches
      const branches = await Branch.find({}).select("id");
      let newArrayBranches: any = [];
      if (branches) {
        // Loop through each branch and create a new item
        newArrayBranches = branches.map((branch) => branch._id);
      }
      await Category.create({
        name,
        description,
        priority,
        branchID: newArrayBranches,
        availableFrom,
        availableTo,
        status: JSON.parse(status),
        appOnly,
        image: {
          url: image ? image.path : "",
          blurHash: imageBlurHash ? imageBlurHash : "",
        },
      });
      return res.status(201).json({
        success: true,
        message: "Category created successfully",
      });
    }
  }
);

export const getAllCategories = TryCatch(async (req, res, next) => {
  const allCategories = await Category.find({});
  return res.status(201).json({
    success: true,
    allCategories,
  });
});

export const getAllForCustomers = TryCatch(async (req, res, next) => {
  console.log("Entered");
  const allCategories = await Category.find({});
  const availableCategories = allCategories.filter(isCategoryAvailable);

  return res.status(200).json({
    success: true,
    availableCategories,
  });
});

export const getCategoryById = TryCatch(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  let categoryById = await Category.findById(categoryId);

  if (!categoryById) {
    return res.status(201).json({
      success: true,
      message: "Category not found",
    });
  } else {
    return res.status(201).json({
      success: true,
      categoryById,
    });
  }
});

export const updateCategoryById = TryCatch(
  async (
    req: Request<{ categoryId: string }, {}, CategoryTypes>,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.params;
    const {
      name,
      description,
      priority,
      availableFrom,
      availableTo,
      status,
      appOnly,
    } = req.body;
    if (!name || !description || !availableFrom || !availableTo || !status) {
      return next(
        new ErrorHandler(
          "Please provide all required fields for the category",
          400
        )
      );
    }

    const categoryData: any = await Category.findById(categoryId);
    if (!categoryData) {
      return next(new ErrorHandler("Couldn't find category", 404));
    }
    // If there's a new image, process it
    let image;
    let imageBlurHash;
    if (req.file) {
      const { imgPath } = req.query;
      const uploadPath = `upload/${imgPath}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      image = await compressImage(req.file, uploadPath);
      imageBlurHash = await encodeImageToBlurhash(image.path);

      // Validate the new image
      if (image) {
        checkImageValidation(
          image,
          400, // maxHeight
          400, // maxWidth
          200 * 1024, // maxSize
          next // Next Function
        ).catch((error) => {
          console.error(error.message);
        });
      }

      // Update the image if a new one is provided
      categoryData.image = {
        url: image ? image.path : categoryData.image.url,
        blurHash: imageBlurHash ? imageBlurHash : categoryData.image.blurHash,
      };
    }

    // Update other fields if provided
    if (name) categoryData.name = name;
    if (description) categoryData.description = description;
    if (priority) categoryData.priority = priority;
    if (availableFrom) categoryData.availableFrom = availableFrom;
    if (availableTo) categoryData.availableTo = availableTo;
    if (appOnly !== undefined) categoryData.appOnly = appOnly;
    if (status) categoryData.status = JSON.parse(status);

    // Save the updated category
    await categoryData.save();

    return res.status(201).json({
      success: true,
      message: "Category Updated Successfully",
    });
  }
);

export const deleteCategoryById = TryCatch(
  async (
    req: Request<{ categoryId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    console.log("reached");
    const { categoryId } = req.params;
    if (!categoryId) {
      return next(new ErrorHandler("Please Provide category Id", 400));
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(new ErrorHandler("Category not found", 400));
    }

    const hasReference = await Item.find({
      category: category._id,
    });

    if (hasReference.length > 0) {
      return next(new ErrorHandler("Category is used in some items", 400));
    }

    const deleted = await category.deleteOne();

    if (!deleted) {
      return next(new ErrorHandler("Category not deleted", 400));
    } else {
      return res.status(201).json({
        success: true,
        message: "Category deleted successfully",
      });
    }
  }
);
