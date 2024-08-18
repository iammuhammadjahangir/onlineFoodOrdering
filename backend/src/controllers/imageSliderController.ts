import { NextFunction, Request, Response } from "express";
import { rm } from "fs";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../utils/errorClassHandler.js";

import { encodeImageToBlurhash } from "../middleware/encodingImage.js";
import { ImageSlider } from "../models/imageSliderModel.js";
import { compressImage } from "../middleware/multer.js";
import fs from "fs";

export const AddSliderImages = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
    console.log(req.files);

    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      return next(new ErrorHandler("Please Add at least one image", 400));
    }

    // Process images
    const { path } = req.query;
    const uploadPath = `upload/${path}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const files = req.files as Express.Multer.File[];
    const photoDataArray = await Promise.all(
      files.map(async (file) => {
        // Compress each uploaded image
        const compressedImage = await compressImage(file, uploadPath);

        return {
          filename: file.filename,
          originalname: file.originalname,
          path: compressedImage.path,
          size: compressedImage.size,
          blurHash: await encodeImageToBlurhash(compressedImage.path),
        };
      })
    );

    const savedPhotos = await ImageSlider.create(photoDataArray);

    if (!savedPhotos) {
      return res.status(400).json({
        status: false,
        message: "Failed to save images",
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Images saved successfully",
        data: savedPhotos,
      });
    }
  }
);

export const getAllSliderImages = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const images = await ImageSlider.find({});
    res.status(200).json({
      success: true,
      images,
    });
  }
);

export const deleteSliderImage = TryCatch(async (req, res, next) => {
  const item = await ImageSlider.findById(req.params.id);
  console.log(item);

  if (!item) return next(new ErrorHandler("Item Not Found", 404));

  if (item.path) {
    rm(item.path, () => {
      console.log("Product Photo Deleted");
    });
  }

  await item.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
