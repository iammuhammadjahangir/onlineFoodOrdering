import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { BannerModel } from "../models/bannerModel.js";
import { Files, newBannerType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { rm } from "fs";
import sharp from "sharp";
import { compressImage } from "../middleware/multer.js";
import { encodeImageToBlurhash } from "../middleware/encodingImage.js";
import { combineDateTime, parseTimeString } from "../middleware/utils.js";
import moment from "moment-timezone";

export const newBanner = TryCatch(
  async (
    req: Request<{}, {}, newBannerType> & { files?: Files },
    res,
    next
  ) => {
    const {
      title,
      startDate,
      endDate,
      // startTime,
      // endTime,
      branches,
      priority,
      linkedItem,
      status,
    } = req.body;

    console.log(req.body);

    let appBannerImage: any;
    let appBannerBlurHash: any;
    let webBannerImage: any;
    let webBannerBlurHash: any;
    const maxSize = 500 * 1024;

    // Process images
    const { imgPath } = req.query;
    const uploadPath = `upload/${imgPath}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log("req", req.files);

    if (req.files) {
      if (req.files.appBannerImage) {
        appBannerImage = await compressImage(
          req.files.appBannerImage[0],
          uploadPath
        );
        //Create a blur Hash of the Image
        appBannerBlurHash = await encodeImageToBlurhash(appBannerImage.path);
      }
      if (req.files.webBannerImage) {
        webBannerImage = await compressImage(
          req.files.webBannerImage[0],
          uploadPath
        );
        //Create a blur Hash of the Image
        webBannerBlurHash = await encodeImageToBlurhash(webBannerImage.path);
      }
    }

    console.log("app Banner Image", appBannerImage);

    if (appBannerImage) {
      const appBannerPath = path.resolve(appBannerImage.path);
      const appBannerMetadata = await sharp(appBannerPath).metadata();

      // Get file size
      const appBannerStats = await fsPromises.stat(appBannerPath);

      console.log("appBannerMetadata", appBannerMetadata);
      console.log("appBannerStats", appBannerStats);
      console.log(
        "width",
        appBannerMetadata.width,
        appBannerMetadata.width! !== 800
      );
      console.log(
        "height",
        appBannerMetadata.height!,
        appBannerMetadata.height! !== 362
      );
      console.log("size", appBannerStats.size, appBannerStats.size < maxSize);
      console.log("maxsize", maxSize);
      if (
        appBannerMetadata.width! !== 800 ||
        appBannerMetadata.height! !== 362 ||
        appBannerStats.size! > maxSize
      ) {
        rm(appBannerImage.path, () => {
          console.log("Deleted");
        });
        return res.status(400).json({
          message: "App banner image exceeds size or dimensions limits",
        });
      } else {
      }
    }

    if (webBannerImage) {
      const webBannerPath = path.resolve(webBannerImage.path);
      const webBannerMetadata = await sharp(webBannerPath).metadata();

      // Get file size
      const webBannerStats = await fsPromises.stat(webBannerPath);
      if (
        webBannerMetadata.width! !== 1520 ||
        webBannerMetadata.height! !== 460 ||
        webBannerStats.size! > maxSize
      ) {
        rm(webBannerImage.path, () => {
          console.log("Deleted");
        });
        return res.status(400).json({
          message: "Web banner image exceeds size or dimensions limits",
        });
      }
    }

    // Validation check
    if (!title || !startDate || !endDate) {
      return next(
        new ErrorHandler("Please provide all required data for the banner", 400)
      );
    }

    // Adjust startDate to the start of the day
    // const start = combineDateTime(startDate, startTime);
    // const end = combineDateTime(endDate, endTime);

    // Create a new banner
    await BannerModel.create({
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      branches: JSON.parse(JSON.stringify(branches.split(","))),
      priority,
      linkedItem,
      status,
      appBannerImage: {
        url: appBannerImage?.path,
        blurHash: appBannerBlurHash,
      },
      webBannerImage: {
        url: webBannerImage?.path,
        blurHash: webBannerBlurHash,
      },
    });

    //   if (!title || !description || !image) {
    //     return next(
    //       new ErrorHandler("Please Provide the data for the banner", 400)
    //     );
    //   }
    //   await BannerModel.create({
    //     title,
    //     description,
    //     image,
    //   });
    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
    });
  }
);

export const getAllBanners = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const banners = await BannerModel.find().populate("linkedItem branches");

    return res.status(200).json({
      success: true,
      data: banners,
    });
  }
);
export const getAllBannersForClient = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { branch } = req.query;
    // Get current date and time in Pakistan Time Zone (PKT)
    const currentDateTimeInPKT = moment
      .tz("Asia/Karachi")
      .format("YYYY-MM-DDTHH:mm:ss.SSS+00:00");

    // Convert to UTC
    // const currentDateTimeInUTC = moment(currentDateTimeInPKT)
    //   .utc()
    //   .format("YYYY-MM-DDTHH:mm:ss.SSS+00:00");
    const query: any = {
      status: true,
      startDate: { $lte: currentDateTimeInPKT },
      endDate: { $gte: currentDateTimeInPKT },
    };

    if (branch) {
      query.branches = branch;
    }

    const banners = await BannerModel.find(query).populate(
      "linkedItem branches"
    );

    return res.status(200).json({
      success: true,
      data: banners,
    });
  }
);

export const getBannerById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const banner = await BannerModel.findById(id).populate(
      "linkedItem branches"
    );

    if (!banner) {
      return next(new ErrorHandler("Banner not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: banner,
    });
  }
);

export const updateBannerStatus = TryCatch(
  async (
    req: Request<{ id: string }, {}, newBannerType> & { files?: Files },
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status } = req.body;
    const banner = await BannerModel.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true }
    );

    if (!banner) {
      return next(new ErrorHandler("Error Updating Status", 400));
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  }
);

export const updateBanner = TryCatch(
  async (
    req: Request<{ id: string }, {}, newBannerType> & { files?: Files },
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const {
      title,
      startDate,
      endDate,
      // startTime,
      // endTime,
      branches,
      priority,
      linkedItem,
      status,
    } = req.body;

    let appBannerImage: any;
    let appBannerBlurHash: any;
    let webBannerImage: any;
    let webBannerBlurHash: any;
    const maxSize = 500 * 1024;

    // Process images if provided
    const { imgPath } = req.query;
    const uploadPath = `upload/${imgPath}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    if (req.files) {
      if (req.files.appBannerImage) {
        appBannerImage = await compressImage(
          req.files.appBannerImage[0],
          uploadPath
        );
        appBannerBlurHash = await encodeImageToBlurhash(appBannerImage.path);
      }
      if (req.files.webBannerImage) {
        webBannerImage = await compressImage(
          req.files.webBannerImage[0],
          uploadPath
        );
        webBannerBlurHash = await encodeImageToBlurhash(webBannerImage.path);
      }
    }

    // Validate dimensions and size of the images
    if (appBannerImage) {
      const appBannerPath = path.resolve(appBannerImage.path);
      const appBannerMetadata = await sharp(appBannerPath).metadata();
      const appBannerStats = await fsPromises.stat(appBannerPath);

      if (
        appBannerMetadata.width! !== 800 ||
        appBannerMetadata.height! !== 362 ||
        appBannerStats.size! > maxSize
      ) {
        fs.rm(appBannerImage.path, () => console.log("Deleted"));
        return res.status(400).json({
          message: "App banner image exceeds size or dimensions limits",
        });
      }
    }

    if (webBannerImage) {
      const webBannerPath = path.resolve(webBannerImage.path);
      const webBannerMetadata = await sharp(webBannerPath).metadata();
      const webBannerStats = await fsPromises.stat(webBannerPath);

      if (
        webBannerMetadata.width! !== 1520 ||
        webBannerMetadata.height! !== 460 ||
        webBannerStats.size! > maxSize
      ) {
        fs.rm(webBannerImage.path, () => console.log("Deleted"));
        return res.status(400).json({
          message: "Web banner image exceeds size or dimensions limits",
        });
      }
    }

    // Adjust startDate to the start of the day
    // Adjust startDate to the start of the day
    // const start = combineDateTime(startDate, startTime);
    // const end = combineDateTime(endDate, endTime);

    // Validation check
    if (!title || !startDate || !endDate) {
      return next(
        new ErrorHandler("Please provide all required data for the banner", 400)
      );
    }

    // Update the banner
    const banner = await BannerModel.findByIdAndUpdate(
      id,
      {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        branches: JSON.parse(JSON.stringify(branches.split(","))),
        priority,
        linkedItem,
        status,
        appBannerImage: appBannerImage && {
          url: appBannerImage.path,
          blurHash: appBannerBlurHash,
        },
        webBannerImage: webBannerImage && {
          url: webBannerImage?.path,
          blurHash: webBannerBlurHash,
        },
      },
      { new: true }
    );

    if (!banner) {
      return next(new ErrorHandler("Banner not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: banner,
    });
  }
);

export const deleteBanner = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const banner = await BannerModel.findById(id);

    if (!banner) {
      return next(new ErrorHandler("Banner not found", 404));
    }

    // Delete associated files if any
    if (banner.appBannerImage) {
      const appBannerImagePath = banner.appBannerImage.url;
      if (appBannerImagePath) {
        fs.unlink(path.resolve(appBannerImagePath), (err) => {
          if (err) console.error("Error deleting appBannerImage:", err);
        });
      }
    }
    if (banner.webBannerImage) {
      const webBannerImagePath = banner.webBannerImage.url;
      if (webBannerImagePath) {
        fs.unlink(path.resolve(webBannerImagePath), (err) => {
          if (err) console.error("Error deleting webBannerImage:", err);
        });
      }
    }

    await BannerModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  }
);
