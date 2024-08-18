import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";

import ErrorHandler from "../utils/errorClassHandler.js";
import {
  NewCustomerRequestBody,
  UpdateCustomerRequestBody,
} from "../types/types.js";
import { Customer } from "../models/customerModel.js";
import mongoose from "mongoose";
import { compressImage } from "../middleware/multer.js";
import fs from "fs";

export const newCustomer = TryCatch(
  async (
    req: Request<{}, {}, NewCustomerRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, avatar, _id, address } = req.body;

    let customer = await Customer.findById(_id);

    if (customer) {
      return res.status(200).json({
        success: true,
        message: `Welcome ${name}`,
      });
    }

    if (!name || !email || !_id)
      return next(new ErrorHandler("Please Fill all the fields", 400));

    customer = await Customer.create({
      name,
      email,
      avatar,
      address,
      _id,
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${customer.name}`,
      data: customer,
    });
  }
);
export const checkoutCustomer = TryCatch(
  async (
    req: Request<{}, {}, NewCustomerRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, phoneNo, _id, address } = req.body;

    let customer = await Customer.findOne({ email });
    console.log(customer);

    if (!name || !email || !_id || !address)
      return next(new ErrorHandler("Please Fill all the fields", 400));

    if (customer) {
      // update customer info
      if (name) customer.name = name;
      if (phoneNo) customer.phoneNo = phoneNo;
      // if customer exist just push the addresses
      if (customer.address) {
        // Ensure each address object has a valid _id field
        address.forEach((addr: any) => {
          addr._id = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        });
        customer.address.push(...address); // Spread operator to push multiple addresses
      } else {
        // If no addresses exist, assign the provided addresses
        // Ensure _id is set for the address object
        address.forEach((addr: any) => {
          addr._id = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        });
        customer.address = address;
      }
      customer = await customer.save();
      return res.status(200).json({
        success: true,
        message: `Welcome ${name}`,
        data: customer,
      });
    } else {
      // if No customer Exist
      customer = await Customer.create({
        name,
        email,
        phoneNo,
        address,
        _id,
      });
      return res.status(201).json({
        success: true,
        message: `Welcome ${customer.name}`,
        data: customer,
      });
    }
  }
);

export const getCustomer = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  // const customer = await Customer.findById(id).populate([
  //   {
  //     path: "wishList",
  //     populate: [
  //       { path: "category" },
  //       { path: "variations", populate: { path: "colors.details" } },
  //     ],
  //   },
  // ]);
  console.log(customer);

  if (!customer) return next(new ErrorHandler("User not found", 404));

  return res.status(200).json({
    success: true,
    customer,
  });
});

export const allCustomer = TryCatch(async (req, res, next) => {
  // Use aggregation to find distinct customer names
  const customers = await Customer.aggregate([
    {
      $group: {
        _id: "$email", // Group by the 'name' field
        // Include other fields if necessary
        customer: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$customer" },
    },
  ]);

  if (!customers || customers.length === 0) {
    return next(new ErrorHandler("Customers not found", 404));
  }

  return res.status(200).json({
    success: true,
    users: customers,
  });
});

export const updateCustomer = TryCatch(
  async (
    req: Request<{ id: string }, {}, UpdateCustomerRequestBody>,
    res,
    next
  ) => {
    console.log(req.params.id);
    console.log(req.file);
    console.log(req.body);
    const id = req.params.id;
    const { name, gender, dob, address, paymentOptions, wishList, phoneNo } =
      req.body;
    const photo = req.file;
    const customer = await Customer.findById(id);
    console.log(customer);

    if (!customer) return next(new ErrorHandler("User not found", 404));
    console.log("JSON.parse(address as any)");

    if (name) customer.name = name;
    if (gender) customer.gender = gender;
    if (dob) customer.dob = JSON.parse(String(dob));
    if (address) customer.address = JSON.parse(address as any);
    if (paymentOptions) customer.paymentOptions = paymentOptions;
    if (phoneNo) customer.phoneNo = phoneNo;
    if (wishList) customer.wishList = JSON.parse(wishList);

    // Process images
    const { path } = req.query;
    const uploadPath = `upload/${path}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Compress each uploaded image
    if (photo) {
      const compressedImages = await compressImage(photo, uploadPath);
      customer.avatar = compressedImages?.path;
    }
    console.log(customer);

    const r = await customer.save();
    console.log("after Dta", r);

    return res.status(200).json({
      success: true,
      message: "profile Updated Sucessfully",
      customer,
    });
  }
);
