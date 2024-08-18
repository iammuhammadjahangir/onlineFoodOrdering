import { TryCatch } from "../middleware/error.js";
import { NextFunction, Request, Response } from "express";
import { WareHouse } from "../models/warehouseModel.js";
import { wareHouseType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import { Branch } from "../models/branchModel.js";

export const createWareHouse = TryCatch(
  async (
    req: Request<{}, {}, wareHouseType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      wareHouseCode,
      wareHouseAddress,
      wareHouseDescription,
      wareHousePhoneNo,
      wareHouseType,
    } = req.body;

    if (
      !wareHouseCode ||
      !wareHouseAddress ||
      !wareHouseDescription ||
      !wareHousePhoneNo
    ) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    const data = await WareHouse.create({
      wareHouseCode,
      wareHouseAddress,
      wareHouseDescription,
      wareHousePhoneNo,
      wareHouseType,
    });

    if (!data) {
      res.status(401).json({
        success: false,
        message: "WareHouse not created",
      });
    } else {
      res.status(200).json({
        success: true,
        data,
      });
    }
  }
);

export const getAllWareHouse = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let wareHouses = await WareHouse.find({});
    if (!wareHouses) {
      res.status(401).json({
        success: false,
        message: "WareHouse not found",
      });
    } else {
      res.status(200).json({
        success: true,
        wareHouses,
      });
    }
  }
);

export const updateWareHouse = TryCatch(
  async (
    req: Request<{ id: string }, {}, wareHouseType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      wareHouseCode,
      wareHouseAddress,
      wareHouseDescription,
      wareHousePhoneNo,
      wareHouseType,
    } = req.body;

    if (
      !wareHouseCode ||
      !wareHouseAddress ||
      !wareHouseDescription ||
      !wareHousePhoneNo
    ) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    const data = await WareHouse.findByIdAndUpdate(req.params.id, {
      wareHouseCode,
      wareHouseAddress,
      wareHouseDescription,
      wareHousePhoneNo,
      wareHouseType,
    });

    if (!data) {
      res.status(401).json({
        success: false,
        message: "WareHouse not updated",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "WareHouse updated",
      });
    }
  }
);

export const deleteWareHouse = TryCatch(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const wareHouse = await WareHouse.findById(id);

    if (!wareHouse) {
      return next(new ErrorHandler("WareHouse not found", 404));
    }
    const hasReference = await Branch.exists({ wareHouseId: id });

    if (hasReference) {
      return next(
        new ErrorHandler(
          "Cannot delete the Record as it is referenced by other records",
          400
        )
      );
    }

    const deleted = await wareHouse.deleteOne();
    if (!deleted) {
      res.status(401).json({
        success: false,
        message: "WareHouse not deleted",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "WareHouse deleted",
      });
    }
  }
);

export const getWareHouseById = TryCatch(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const wareHouse = await WareHouse.findById(id);
    if (!wareHouse) {
      return next(new ErrorHandler("WareHouse not found", 404));
    }
    res.status(200).json({
      success: true,
      wareHouse,
    });
  }
);
