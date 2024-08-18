// import { NextFunction, Request, Response } from "express";
// import { TryCatch } from "../middleware/error.js";
// import { VartiationOptions } from "../models/variationOptionsmodel.js";
// import {
//   VariationOptionsTypes,
//   VariationOptionsUpdateTypes,
// } from "../types/types.js";
// import ErrorHandler from "../utils/errorClassHandler.js";
// import { ObjectId } from "mongoose";
// import { Variation } from "../models/variationModel.js";

// export const newVariationOptions = TryCatch(
//   async (
//     req: Request<{}, {}, VariationOptionsTypes>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { name, price } = req.body;
//     if (!name) {
//       return next(new ErrorHandler("Please Provide the Name of option", 400));
//     }
//     const varOptionData: VariationOptionsTypes = {
//       name,
//     };
//     if (price) varOptionData.price = price;

//     const isExist = await VartiationOptions.exists({ name: name });
//     if (isExist) {
//       return next(new ErrorHandler("Variation Option already exist", 400));
//     }

//     await VartiationOptions.create(varOptionData);
//     return res.status(201).json({
//       success: true,
//       message: "Variation Options created successfully",
//     });
//   }
// );

// export const getAllVariationOptions = TryCatch(async (req, res, next) => {
//   const allCategories = await VartiationOptions.find({});
//   return res.status(201).json({
//     success: true,
//     allCategories,
//   });
// });

// export const getVariationOptionsById = TryCatch(async (req, res, next) => {
//   const variationOptionId = req.params.variationOptionId;
//   let variations = await VartiationOptions.findById(variationOptionId);

//   if (!variations) {
//     return res.status(201).json({
//       success: true,
//       message: "Category not found",
//     });
//   } else {
//     return res.status(201).json({
//       success: true,
//       variations,
//     });
//   }
// });

// export const updateVariationOptionsById = TryCatch(
//   async (
//     req: Request<
//       { variationOptionId: string },
//       {},
//       VariationOptionsUpdateTypes
//     >,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { variationOptionId } = req.params;
//     const { price } = req.body;
//     if (!price)
//       return next(new ErrorHandler("Please Provide New Price To update", 400));

//     await VartiationOptions.findByIdAndUpdate(variationOptionId, { price });
//     return res.status(201).json({
//       success: true,
//       message: "Variation Price Updated Successfully",
//     });
//   }
// );

// export const deleteVariationOptionById = TryCatch(
//   async (
//     req: Request<
//       { variationOptionId: string },
//       {},
//       VariationOptionsUpdateTypes
//     >,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { variationOptionId } = req.params;
//     if (!variationOptionId) {
//       return next(new ErrorHandler("Please Provide Variation Option Id", 400));
//     }
//     const variationOption = await VartiationOptions.findById(variationOptionId);
//     if (!variationOption) {
//       return next(new ErrorHandler("Variation Option not found", 400));
//     }

//     const hasReference = await Variation.find({
//       variationOptions: variationOption._id,
//     });

//     if (hasReference.length > 0) {
//       return next(
//         new ErrorHandler("Variation Option is used in some variation", 400)
//       );
//     }

//     const deleted = await variationOption.deleteOne();

//     if (!deleted) {
//       return next(new ErrorHandler("Variation Option not deleted", 400));
//     } else {
//       return res.status(201).json({
//         success: true,
//         message: "Variation Option deleted successfully",
//       });
//     }
//   }
// );
