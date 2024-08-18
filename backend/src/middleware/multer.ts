import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { promises as fsPromises } from "fs";
import { rm } from "fs";
import ErrorHandler from "../utils/errorClassHandler.js";
import { NextFunction } from "express";

//to access this files of multer and make the upload folder static .. then we have to use the
// express.static() in the app.js file

const storageWithOutBuffer = multer.diskStorage({
  destination(req, file, callback) {
    const { path } = req.query;
    console.log("sal");
    console.log(path);
    const uploadPath = `upload/${path}`; // Specify the folder where you want to store files

    // Check if the folder exists, and create it if not
    if (!fs.existsSync(uploadPath)) {
      try {
        fs.mkdirSync(uploadPath, { recursive: true }); // Create folder recursively
      } catch (error: any) {
        console.error("Error creating upload folder:", error);
        return callback(error, ""); // Fix: Change the second argument to an empty string
      }
    }

    callback(null, uploadPath);
  },
  filename(req, file, callback) {
    // const cnic = req.body.CNICNumber;
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("photo");
export const upload = multer({ storage });
export const singleUploadWithOutBuffer = multer({
  storage: storageWithOutBuffer,
}).single("photo");
export const multiUpload = multer({ storage }).array("photos", 50);

export const compressImage = async (
  file: Express.Multer.File,
  destinationPath: string
) => {
  console.log(file);
  const compressedImageBuffer = await sharp(file.buffer)
    // .resize(800, 800, {
    //   fit: sharp.fit.inside,
    //   withoutEnlargement: true,
    // })
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toBuffer();

  const compressedFileName = `${destinationPath}/compressed_${uuid()}.jpeg`;
  fs.writeFileSync(compressedFileName, compressedImageBuffer);

  return {
    originalname: file.originalname,
    mimetype: file.mimetype,
    filename: compressedFileName,
    path: compressedFileName,
    size: compressedImageBuffer.length,
  };
};
// Function to validate the image
export const checkImageValidation = async (
  ImageData: any,
  maxHeight: number,
  maxWidth: number,
  maxSize: number,
  next: NextFunction
) => {
  try {
    const Path = path.resolve(ImageData.path);
    const Metadata = await sharp(Path).metadata();
    const Stats = await fsPromises.stat(Path);

    console.log(" Metadata.width", Metadata.width);
    console.log("Number(maxWidth)", Number(maxWidth));
    console.log("Metadata.height", Metadata.height);
    console.log("Number(maxHeight)", Number(maxHeight));
    console.log("Stats.size", Stats.size);
    console.log("Number(maxSize)", Number(maxSize));
    // Get file size
    if (
      Metadata.width !== Number(maxWidth) ||
      Metadata.height !== Number(maxHeight) ||
      Stats.size > Number(maxSize)
    ) {
      rm(ImageData.path, () => {
        console.log("Deleted");
      });
      return next(
        new ErrorHandler("Image exceeds the required dimensions and size", 400)
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
