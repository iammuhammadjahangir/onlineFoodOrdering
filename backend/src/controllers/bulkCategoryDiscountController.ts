import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { BulkCategoryDiscount } from "../models/bulkCategoryDiscountModel.js";
import { newBulkCategoryDiscountType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";

// Admin: Create a new Bulk Category Discount
export const newBulkCategoryDiscount = TryCatch(
  async (
    req: Request<{}, {}, newBulkCategoryDiscountType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      categories,
      brandName,
      discountPercentage,
      startDate,
      endDate,
      disableCategoryAfterExpiry,
    } = req.body;

    // Validation Check
    if (
      !categories ||
      !brandName ||
      !discountPercentage ||
      !startDate ||
      !endDate
    ) {
      return next(new ErrorHandler("Please Provide all the fields", 400));
    }
    // Check if the discount percentage is valid
    if (discountPercentage < 0 || discountPercentage > 100) {
      return next(
        new ErrorHandler("Discount percentage must be between 0 and 100", 400)
      );
    }
    // Check if the start date is before the end date
    if (new Date(startDate) > new Date(endDate)) {
      return next(new ErrorHandler("Start date must be before end date", 400));
    }
    // Create a new bulk category discount
    const newBulkCategoryDiscount = await BulkCategoryDiscount.create({
      categories,
      brandName,
      discountPercentage,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      disableCategoryAfterExpiry,
    });

    return res.status(201).json({
      success: true,
      message: "Bulk Category Discount created successfully",
      data: newBulkCategoryDiscount,
    });
  }
);

// Admin
export const updateBulkCategoryStatus = TryCatch(
  async (
    req: Request<{ id: string }, {}, { status: boolean }>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status } = req.body;
    const bulkCategory = await BulkCategoryDiscount.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true }
    );

    if (!bulkCategory) {
      return next(new ErrorHandler("Error Updating Status", 400));
    }

    res.status(200).json({
      success: true,
      data: bulkCategory,
    });
  }
);

// Admin: Update Bulk Category Discount by ID
export const updateBulkCategoryDiscount = TryCatch(
  async (
    req: Request<{ id: string }, {}, newBulkCategoryDiscountType>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const {
      categories,
      brandName,
      discountPercentage,
      startDate,
      endDate,
      disableCategoryAfterExpiry,
    } = req.body;

    if (!id) {
      return next(new ErrorHandler("Please Provide ID", 400));
    }

    // Validation Check
    if (
      !categories ||
      !brandName ||
      !discountPercentage ||
      !startDate ||
      !endDate
    ) {
      return next(new ErrorHandler("Please Provide all the fields", 400));
    }
    // Check if the discount percentage is valid
    if (discountPercentage < 0 || discountPercentage > 100) {
      return next(
        new ErrorHandler("Discount percentage must be between 0 and 100", 400)
      );
    }
    // Check if the start date is before the end date
    if (new Date(startDate) > new Date(endDate)) {
      return next(new ErrorHandler("Start date must be before end date", 400));
    }

    const bulkDiscount = await BulkCategoryDiscount.findByIdAndUpdate(
      id,
      {
        categories: categories,
        brandName,
        discountPercentage,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        disableCategoryAfterExpiry,
      },
      { new: true }
    );

    if (!bulkDiscount) {
      return next(new ErrorHandler("Discount Not Updated ", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Bulk Category Discount updated successfully",
      data: bulkDiscount,
    });
  }
);

// Admin: Delete Bulk Category Discount by ID
export const deleteBulkCategoryDiscount = TryCatch(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Please Provide ID", 400));
    }

    const bulkDiscount = await BulkCategoryDiscount.findByIdAndDelete(id);

    if (!bulkDiscount) {
      return next(new ErrorHandler("Discount Not Deleted ", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Bulk Category Discount deleted successfully",
    });
  }
);

// Admin & Client: Get all Bulk Category Discounts
export const getAllBulkCategoryDiscounts = TryCatch(async (req, res, next) => {
  const bulkDiscounts = await BulkCategoryDiscount.find().populate(
    "categories"
  );

  return res.status(200).json({
    success: true,
    data: bulkDiscounts,
  });
});

// Client: Get Bulk Category Discount by ID
export const getBulkCategoryDiscountById = TryCatch(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Please Provide ID", 400));
    }

    const bulkDiscount = await BulkCategoryDiscount.findById(id);

    if (!bulkDiscount) {
      return next(new ErrorHandler("Cannot find this discount", 400));
    }

    return res.status(200).json({
      success: true,
      data: bulkDiscount,
    });
  }
);
