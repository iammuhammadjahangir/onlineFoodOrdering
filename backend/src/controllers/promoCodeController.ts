import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { PromoCode } from "../models/promoCodeModel.js";
import { newPromoCodeType } from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";

export const newPromoCode = TryCatch(
  async (req: Request<{}, {}, any>, res: Response, next: NextFunction) => {
    const {
      promoCode,
      startDate,
      endDate,
      forFirstTimeOnly,
      maxCount,
      maxCountPerUser,
      discountType,
      discountAmount,
      minimumOrderAmount,
      orderType,
      branches,
      applicableOnSections,
      freeProduct,
      specificCustomer,
      applicableOn,
    } = req.body;

    // Check for missing fields
    const requiredFields = [
      "promoCode",
      "startDate",
      "endDate",
      "maxCount",
      "maxCountPerUser",
      "discountType",
      "discountAmount",
      "minimumOrderAmount",
      "orderType",
      "branches",
      "applicableOn",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(new ErrorHandler(`Please provide ${field}`, 400));
      }
    }

    // Validate date range
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (parsedStartDate >= parsedEndDate) {
      return next(new ErrorHandler("Start date must be before end date", 400));
    }

    // Validate discount amount
    if (discountAmount <= 0) {
      return next(
        new ErrorHandler("Discount amount must be greater than 0", 400)
      );
    }

    if (discountType === "Percentage" && discountAmount > 100) {
      return next(
        new ErrorHandler("Discount percentage must be between 0 and 100", 400)
      );
    }

    // Validate minimum order amount
    if (minimumOrderAmount && minimumOrderAmount < 0) {
      return next(
        new ErrorHandler("Minimum order amount must be greater than 0", 400)
      );
    }

    // Validate order type
    const validOrderTypes = ["Delivery", "Pickup", "Both"];
    if (!validOrderTypes.includes(orderType)) {
      return next(
        new ErrorHandler(
          "Order type must be either Delivery,Pickup or Both",
          400
        )
      );
    }

    // Validate applicable on
    const validApplicableOns = ["App", "Web", "Both"];
    if (!validApplicableOns.includes(applicableOn)) {
      return next(
        new ErrorHandler("Applicable on must be either App, Web, or Both", 400)
      );
    }

    // Validate branches
    if (!Array.isArray(branches) || branches.length === 0) {
      return next(new ErrorHandler("Please provide branches", 400));
    }

    // Create promo code
    const promo = await PromoCode.create({
      promoCode,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      forFirstTimeOnly,
      maxCount,
      maxCountPerUser,
      discountType,
      discountAmount,
      minimumOrderAmount,
      orderType,
      branches,
      applicableOnSections,
      freeProduct,
      specificCustomer,
      applicableOn,
    });

    return res.status(201).json({
      success: true,
      message: "Promo Code created successfully",
      data: promo,
    });
  }
);

// Admin
export const updatePromoCodeStatus = TryCatch(
  async (
    req: Request<{ id: string }, {}, { status: boolean }>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status } = req.body;
    const promoCode = await PromoCode.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true }
    );

    if (!promoCode) {
      return next(new ErrorHandler("Error Updating Status", 400));
    }

    res.status(200).json({
      success: true,
      data: promoCode,
    });
  }
);

export const updateUsedCount = TryCatch(
  async (
    req: Request<{ code: string }, {}, { status: boolean }>,
    res: Response,
    next: NextFunction
  ) => {
    const { code } = req.params;
    const promoCode = await PromoCode.findOne({ promoCode: code });
    if (!promoCode) {
      return next(new ErrorHandler("Error Updating Status", 400));
    }
    promoCode.usedCount += 1;
    await promoCode.save();

    res.status(200).json({
      success: true,
      data: promoCode,
    });
  }
);

// Admin: Update Promo Code by ID
export const updatePromoCode = TryCatch(
  async (
    req: Request<{ id: string }, {}, any>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const {
      promoCode,
      startDate,
      endDate,
      forFirstTimeOnly,
      maxCount,
      maxCountPerUser,
      discountType,
      discountAmount,
      minimumOrderAmount,
      orderType,
      branches,
      applicableOnSections,
      freeProduct,
      specificCustomer,
      applicableOn,
    } = req.body;

    if (!id) {
      return next(new ErrorHandler("Please provide ID", 400));
    }

    // Check for missing fields
    const requiredFields = [
      "promoCode",
      "startDate",
      "endDate",
      "maxCount",
      "maxCountPerUser",
      "discountType",
      "discountAmount",
      "minimumOrderAmount",
      "orderType",
      "branches",
      "applicableOn",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(new ErrorHandler(`Please provide ${field}`, 400));
      }
    }

    // Validate date range
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (parsedStartDate >= parsedEndDate) {
      return next(new ErrorHandler("Start date must be before end date", 400));
    }

    // Validate discount amount
    if (discountAmount <= 0) {
      return next(
        new ErrorHandler("Discount amount must be greater than 0", 400)
      );
    }

    if (discountType === "Percentage" && discountAmount > 100) {
      return next(
        new ErrorHandler("Discount percentage must be between 0 and 100", 400)
      );
    }

    // Validate minimum order amount
    if (minimumOrderAmount < 0) {
      return next(
        new ErrorHandler("Minimum order amount must be greater than 0", 400)
      );
    }

    // Validate order type
    const validOrderTypes = ["Delivery", "Pickup"];
    if (!validOrderTypes.includes(orderType)) {
      return next(
        new ErrorHandler("Order type must be either Delivery or Pickup", 400)
      );
    }

    // Validate applicable on
    const validApplicableOns = ["App", "Web", "Both"];
    if (!validApplicableOns.includes(applicableOn)) {
      return next(
        new ErrorHandler("Applicable on must be either App, Web, or Both", 400)
      );
    }

    // Validate branches
    if (!Array.isArray(branches) || branches.length === 0) {
      return next(new ErrorHandler("Please provide branches", 400));
    }

    const promo = await PromoCode.findByIdAndUpdate(
      id,
      {
        promoCode,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        forFirstTimeOnly,
        maxCount,
        maxCountPerUser,
        discountType,
        discountAmount,
        minimumOrderAmount,
        orderType,
        branches,
        applicableOnSections,
        freeProduct,
        specificCustomer,
        applicableOn,
      },
      { new: true }
    );

    if (!promo) {
      return next(new ErrorHandler("Promo Code not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Promo Code updated successfully",
      data: promo,
    });
  }
);
// Admin: Delete Promo Code by ID
export const deletePromoCode = TryCatch(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Please Provide ID", 400));
    }

    const promo = await PromoCode.findByIdAndDelete(id);

    if (!promo) {
      return next(new ErrorHandler("Promo Code Not Deleted ", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Promo Code deleted successfully",
    });
  }
);

// Admin & Client: Get all Promo Codes
export const getAllPromoCodes = TryCatch(async (req, res, next) => {
  const promos = await PromoCode.find()
    .populate("branches")
    .populate("applicableOnSections")
    .populate("freeProduct")
    .populate("specificCustomer");

  if (!promos) {
    return next(new ErrorHandler("No Promo Codes found", 400));
  }

  return res.status(200).json({
    success: true,
    data: promos,
  });
});

// Client: Get Promo Code by ID
export const getPromoCodeById = TryCatch(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Please Provide ID", 400));
    }

    const promo = await PromoCode.findById(id);

    if (!promo) {
      return next(new ErrorHandler("Promo Code Not Found ", 400));
    }

    return res.status(200).json({
      success: true,
      data: promo,
    });
  }
);

// // Client: Apply Promo Code to an Order
// export const applyPromoCode = TryCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { promoCode, orderId, userId } = req.body;

//     // Check if promo code, order ID, and user ID are provided
//     if (!promoCode || !orderId || !userId) {
//       return next(new ErrorHandler("Please provide promo code, order ID, and user ID", 400));
//     }

//     // Fetch promo code details
//     const promo = await PromoCode.findOne({ promoCode });
//     if (!promo) {
//       return next(new ErrorHandler("Invalid promo code", 404));
//     }

//     // Fetch order details
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return next(new ErrorHandler("Invalid order ID", 404));
//     }

//     // Fetch user details
//     const user = await User.findById(userId);
//     if (!user) {
//       return next(new ErrorHandler("Invalid user ID", 404));
//     }

//     const currentDateTime = new Date();

//     // Check if the promo code is within the validity period
//     if (currentDateTime < new Date(promo.startDate) || currentDateTime > new Date(promo.endDate)) {
//       return next(new ErrorHandler("Promo code is not valid at this time", 400));
//     }

//     // Check if the promo code is for first-time users only and if the user is a first-time user
//     if (promo.forFirstTimeOnly) {
//       const userOrders = await Order.find({ userId });
//       if (userOrders.length > 0) {
//         return next(new ErrorHandler("Promo code is only valid for first-time users", 400));
//       }
//     }

//     // Check if the max count for the promo code has been reached
//     const totalUsage = await Order.countDocuments({ promoCode });
//     if (totalUsage >= promo.maxCount) {
//       return next(new ErrorHandler("Promo code usage limit has been reached", 400));
//     }

//     // Check if the max count per user has been reached
//     const userUsage = await Order.countDocuments({ userId, promoCode });
//     if (userUsage >= promo.maxCountPerUser) {
//       return next(new ErrorHandler("Promo code usage limit per user has been reached", 400));
//     }

//     // Check if the minimum order amount is met
//     if (order.totalAmount < promo.minimumOrderAmount) {
//       return next(new ErrorHandler("Order amount is less than the minimum required for this promo code", 400));
//     }

//     // Check if the order type matches
//     if (promo.orderType !== "Both" && promo.orderType !== order.orderType) {
//       return next(new ErrorHandler("Promo code is not applicable for this order type", 400));
//     }

//     // Check if the promo code is applicable on the current platform
//     const platform = req.headers["platform"]; // Assuming you set a platform header on the client side
//     if (promo.applicableOn !== "Both" && promo.applicableOn !== platform) {
//       return next(new ErrorHandler("Promo code is not applicable on this platform", 400));
//     }

//     // Check if the promo code is applicable to the specific customer
//     if (promo.specificCustomer && promo.specificCustomer.length > 0) {
//       const isSpecificCustomer = promo.specificCustomer.some(customer => customer.equals(userId) || customer === userId);
//       if (!isSpecificCustomer) {
//         return next(new ErrorHandler("Promo code is not applicable for this customer", 400));
//       }
//     }

//     // Apply the promo code
//     let discountAmount = 0;
//     if (promo.discountType === "Percentage") {
//       discountAmount = (order.totalAmount * promo.discountAmount) / 100;
//     } else if (promo.discountType === "Flat") {
//       discountAmount = promo.discountAmount;
//     }

//     // Check if a free product needs to be added
//     if (promo.freeProduct) {
//       order.items.push({
//         productId: promo.freeProduct,
//         quantity: 1,
//         price: 0,
//       });
//     }

//     // Apply the discount
//     order.totalAmount -= discountAmount;
//     order.promoCode = promoCode;
//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Promo code applied successfully",
//       discountAmount,
//       newTotalAmount: order.totalAmount,
//     });
//   }
// );
