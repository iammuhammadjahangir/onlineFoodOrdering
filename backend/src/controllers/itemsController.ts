import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { encodeImageToBlurhash } from "../middleware/encodingImage.js";
import { TryCatch } from "../middleware/error.js";
import { checkImageValidation, compressImage } from "../middleware/multer.js";
import { IncrementValuesFunction } from "../middleware/utils.js";
import { Item } from "../models/itemsModel.js";
import { ItemFiles, ItemType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import mongoose from "mongoose";
import { promises as fsPromises } from "fs";
import { Branch } from "../models/branchModel.js";
import { ItemBranch } from "../models/itemBranch.js";
const { rm } = fsPromises;

// Create a new item
export const newItem = TryCatch(
  async (
    req: Request<{}, {}, ItemType> & { files?: ItemFiles },
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      description,
      brandName,
      category,
      deal,
      promoCodeOnly,
      available,
      upsellingItem,
      appOnly,
      deliveryBy,
      priceType,
      price,
      discountType,
      discountPrice,
      preparationTime,
      calories,
      barcode,
      sku,
      uom,
      skuPosMappingId,
      priority,
      tags,
      allergens,
      productImage,
      id,
    } = req.body;
    const photo = req.files;

    if (
      !name ||
      !description ||
      !brandName ||
      !category ||
      !deliveryBy ||
      !priceType ||
      !price ||
      !preparationTime ||
      !uom ||
      !skuPosMappingId
    ) {
      return next(new ErrorHandler("Please provide all required details", 400));
    }

    let image: any;
    let imageBlurHash: any;
    let additionalImages: any;
    // let webBannerBlurHash: any;
    const maxSize = 200 * 1024;

    // Process images
    const { imgPath } = req.query;
    const uploadPath = `upload/${imgPath}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    if (!req.files)
      return next(new ErrorHandler("Please add a product photo", 400));

    if (photo) {
      if (req.files.photo) {
        image = await compressImage(req.files.photo[0], uploadPath);
        imageBlurHash = await encodeImageToBlurhash(image.path);
      }

      if (req.files.additionalImages) {
        additionalImages = await Promise.all(
          req.files.additionalImages.map(async (image: any) => {
            const compressedImage = await compressImage(image, uploadPath);
            const blurHash = await encodeImageToBlurhash(compressedImage.path);
            return {
              url: compressedImage.path,
              blurHash: blurHash,
            };
          })
        );
      }
    }

    if (image) {
      checkImageValidation(
        image,
        400, // maxHeight
        400, // maxWidth
        maxSize, // maxSize
        next //  Next Function
      ).catch((error) => {
        console.error(error.message);
      });
    }

    if (additionalImages) {
      additionalImages?.forEach((image: any) => {
        checkImageValidation(
          image,
          400, // maxHeight
          400, // maxWidth
          maxSize, // maxSize
          next //  Next Function
        ).catch((error) => {
          console.error(error.message);
        });
      });
    }

    const itemCode = await IncrementValuesFunction(
      "itemautoval",
      "Item",
      "001" // Convert number to string with leading zeros
    );

    const itemData = {
      id: itemCode,
      name,
      brandName,
      description,
      category: JSON.parse(category),
      productImage: {
        url: image.path,
        blurHash: imageBlurHash,
      },
      additionalImages: additionalImages,
      deal,
      promoCodeOnly,
      available,
      upsellingItem,
      appOnly,
      deliveryBy,
      priceType,
      price,
      discountType,
      discountPrice,
      preparationTime,
      calories,
      barcode,
      sku,
      uom,
      skuPosMappingId,
      priority,
      allergens: allergens && JSON.parse(allergens),
      tags: tags && JSON.parse(tags),
    };

    const newItem = await Item.create(itemData);
    console.log("newItem", newItem);

    if (!newItem) {
      return next(new ErrorHandler("Item not created", 400));
    } else {
      // Search for Branches
      const branches = await Branch.find({}).select("id");
      if (branches) {
        // Loop through each branch and create a new item
        const newArrayBranches = branches.map((branch) => branch._id);
        const itemBranchCode = await IncrementValuesFunction(
          "itemBranchCode",
          "Item",
          "001" // Convert number to string with leading zeros
        );

        // branches.forEach(async (branch) => {
        // const branchId = branch.id;
        const branchItemData = {
          id: itemBranchCode,
          branchID: newArrayBranches,
          itemID: newItem._id,
        };

        await ItemBranch.create(branchItemData);
        // });
        return res.status(201).json({
          success: true,
          message: "New Item created successfully",
        });
      }
    }

    // return res.status(201).json({
    //   success: true,
    //   message: "New Item created successfully",
    // });
  }
);

// Get all items for admin
export const getAllItemsForAdmin = TryCatch(async (req, res, next) => {
  const allItems = await Item.find({}).populate("category");

  if (!allItems || allItems.length === 0) {
    return next(new ErrorHandler("No Items Found", 404));
  }

  return res.status(200).json({
    success: true,
    allItems,
  });
});
export const updateItemById = TryCatch(
  async (
    req: Request<{ ItemsId: string }, {}, ItemType> & { files?: ItemFiles },
    res: Response,
    next: NextFunction
  ) => {
    const { ItemsId } = req.params;
    const {
      name,
      description,
      brandName,
      category,
      deal,
      promoCodeOnly,
      available,
      upsellingItem,
      appOnly,
      deliveryBy,
      priceType,
      price,
      discountType,
      discountPrice,
      preparationTime,
      calories,
      barcode,
      sku,
      uom,
      skuPosMappingId,
      priority,
      tags,
    } = req.body;

    const photo = req.files?.photo;
    const additionalImages = req.files?.additionalImages;

    console.log("additionalImages", additionalImages);
    console.log("req.files", req.files);

    if (
      !name ||
      !description ||
      !brandName ||
      !category ||
      !deliveryBy ||
      !priceType ||
      !price ||
      !preparationTime ||
      !uom ||
      !skuPosMappingId
    ) {
      return next(new ErrorHandler("Please provide all required details", 400));
    }

    const item: any = await Item.findById(ItemsId);

    if (!item) {
      return next(new ErrorHandler("Item not found", 404));
    }

    // Check if the combined total of old and new images exceeds 5
    const existingImageCount = item.additionalImages
      ? item.additionalImages.length
      : 0;
    const newImageCount = additionalImages ? additionalImages.length : 0;

    if (existingImageCount + newImageCount > 5) {
      return next(new ErrorHandler("Images cannot exceed 5", 400));
    }

    let image: any;
    let imageBlurHash: any;
    const maxSize = 200 * 1024;

    // Process the new image if provided
    if (photo) {
      console.log("entered in photo");
      const { imgPath } = req.query;
      const uploadPath = `upload/${imgPath}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      image = await compressImage(photo[0], uploadPath);
      imageBlurHash = await encodeImageToBlurhash(image.path);

      // Validate the new image
      await checkImageValidation(
        image,
        400, // maxHeight
        400, // maxWidth
        maxSize, // maxSize
        next // Next Function
      ).catch((error) => {
        console.error(error.message);
      });

      // Remove the old image
      if (item.productImage.url) {
        fs.rm(item.productImage.url, () => console.log("Deleted"));
      }

      item.productImage.url = image.path;
      item.productImage.blurHash = imageBlurHash;
    }

    // Process additional images if provided
    if (additionalImages) {
      console.log("enter in additional");
      const { imgPath } = req.query;
      const uploadPath = `upload/${imgPath}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const processedImages = [];
      for (const img of additionalImages) {
        const compressedImage = await compressImage(img, uploadPath);
        const blurHash = await encodeImageToBlurhash(compressedImage.path);

        await checkImageValidation(
          compressedImage,
          400, // maxHeight
          400, // maxWidth
          maxSize, // maxSize
          next // Next Function
        ).catch((error) => {
          console.error(error.message);
        });

        processedImages.push({
          url: compressedImage.path,
          blurHash: blurHash,
        });
      }

      // Append new additional images to the existing ones
      item.additionalImages = item.additionalImages || []; // Ensure it's an array
      item.additionalImages.push(...processedImages);
    }

    // Update other fields
    if (name) item.name = name;
    if (description) item.description = description;
    if (brandName) item.brandName = brandName;
    if (price) item.price = price;
    if (discountType) item.discountType = discountType;
    if (discountPrice) item.discountPrice = discountPrice;
    if (preparationTime) item.preparationTime = preparationTime;
    if (calories) item.calories = calories;
    if (barcode) item.barcode = barcode;
    if (sku) item.sku = sku;
    if (uom) item.uom = uom;
    if (skuPosMappingId) item.skuPosMappingId = skuPosMappingId;
    if (priority) item.priority = priority;
    if (tags) item.tags = JSON.parse(tags);
    if (category) item.category = JSON.parse(category);
    item.deal = deal;
    if (promoCodeOnly) item.promoCodeOnly = promoCodeOnly;
    item.available = available;
    if (upsellingItem) item.upsellingItem = upsellingItem;
    item.appOnly = appOnly;
    if (deliveryBy) item.deliveryBy = deliveryBy;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
    });
  }
);

// Delete item by ID
export const deleteItem = TryCatch(async (req, res, next) => {
  const item: any = await Item.findById(req.params.ItemsId);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  // Delete the primary product image
  if (item.productImage.url) {
    await rm(item.productImage.url).catch((error) => {
      console.error(`Failed to delete primary image: ${error.message}`);
    });
  }

  // Delete additional images
  if (item.additionalImages && item.additionalImages.length > 0) {
    for (const img of item.additionalImages) {
      if (img.url) {
        await rm(img.url).catch((error) => {
          console.error(`Failed to delete additional image: ${error.message}`);
        });
      }
    }
  }

  // Delete the item from the database
  await item.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
});

// Delete additional image by index
export const deleteAdditionalImageByIndex = TryCatch(
  async (
    req: Request<{ ItemsId: string }, {}, { index: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const { ItemsId } = req.params;
    const { index } = req.body;

    // Validate the index
    if (index === undefined || index < 0) {
      return next(new ErrorHandler("Invalid index provided", 400));
    }

    // Find the item by ID
    const item: any = await Item.findById(ItemsId);

    if (!item) {
      return next(new ErrorHandler("Item not found", 404));
    }

    // Check if there are additional images and index is within range
    if (!item.additionalImages || index >= item.additionalImages.length) {
      return next(
        new ErrorHandler("Image not found at the specified index", 404)
      );
    }

    // Delete the image file from the file system
    const imageToDelete = item.additionalImages[index];
    if (imageToDelete.url) {
      await rm(imageToDelete.url).catch((error) => {
        console.error(`Failed to delete additional image: ${error.message}`);
      });
    }

    // Remove the image from the array
    item.additionalImages.splice(index, 1);

    // Save the updated item
    await item.save();

    return res.status(200).json({
      success: true,
      message: "Additional image deleted successfully",
    });
  }
);

// // Get all items for general users
// export const getAllItems = TryCatch(async (req, res, next) => {
//   const allItems = await Item.find({}).populate("category");

//   if (!allItems || allItems.length === 0) {
//     return next(new ErrorHandler("No Items Found", 404));
//   }

//   let categorizedItems: { category: string; items: any[] }[] = [];
//   allItems.forEach((item) => {
//     let found = categorizedItems.some((catItem) => {
//       if (catItem.category === item.category.name) {
//         catItem.items.push(item);
//         return true;
//       }
//     });
//     if (!found) {
//       categorizedItems.push({
//         category: item.category.name,
//         items: [item],
//       });
//     }
//   });

//   return res.status(200).json({
//     success: true,
//     CategoryCount: categorizedItems.length,
//     ItemsCount: allItems.length,
//     categorizedItems,
//   });
// });

// // Get item by ID
// export const getItemById = TryCatch(async (req, res, next) => {
//   const id = req.params.ItemsId;
//   const item = await Item.findById(id).populate("category");

//   if (!item) {
//     return next(new ErrorHandler("Item not found", 404));
//   }

//   return res.status(200).json({
//     success: true,
//     item,
//   });
// });

// // Search items with filters
// export const getSearchedItems = TryCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { search, category, price, sort } = req.query;

//     const page = Number(req.query.page) || 1;
//     const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
//     const skip = (page - 1) * limit;

//     const baseQuery: any = {};

//     if (search) {
//       baseQuery.name = {
//         $regex: search,
//         $options: "i",
//       };
//     }

//     if (price) {
//       baseQuery.price = {
//         $lte: Number(price),
//       };
//     }
//     if (category) {
//       baseQuery.category = category;
//     }

//     const itemsPromise = Item.find(baseQuery)
//       .sort(sort && { price: sort === "asc" ? 1 : -1 })
//       .limit(limit)
//       .skip(skip)
//       .populate("category");

//     const [Items, filteredItems] = await Promise.all([
//       itemsPromise,
//       Item.find(baseQuery),
//     ]);

//     const totalProducts = filteredItems.length;
//     const totalPage = Math.ceil(totalProducts / limit);

//     return res.status(200).json({
//       success: true,
//       Items,
//       totalProducts,
//       totalPage,
//     });
//   }
// );
