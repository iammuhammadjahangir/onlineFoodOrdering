import { TryCatch } from "../middleware/error.js";
import { NextFunction, Request, Response } from "express";
import { Role } from "../models/roleModel.js";
import {
  BaseQuery,
  NewRoleType,
  PlaceOrderType,
  SearchRequestQuery,
  UpdateOrderStatus,
} from "../types/types.js";
import ErrorHandler from "../utils/errorClassHandler.js";
import { IncrementIDs } from "../models/orderInvoiceNumberModel.js";
import { Order } from "../models/orderModel.js";
import mongoose from "mongoose";
// import { Variation } from "../models/variationModel.js";
import { validate } from "uuid";
// import { getBaseQuery } from "./productDetailsController.js";
import { Item } from "../models/itemsModel.js";
import { invalidatesCache } from "../utils/invalidatesCache.js";
import { Customer } from "../models/customerModel.js";
import { IncrementValuesFunction } from "../middleware/utils.js";

export const placeOrder = TryCatch(
  async (
    req: Request<{}, {}, PlaceOrderType>,
    res: Response,
    next: NextFunction
  ) => {
    console.log("entered");

    const seqId = await IncrementValuesFunction(
      "orderautoval",
      "Order_",
      "1000"
    );

    console.log(seqId);
    const {
      customerId,
      deliveryAddress,
      shippingFee,
      deviceType,
      subTotal,
      couponDiscountCode,
      discountPrice,
      grandTotalPrice,
      items,
      paymentMethod,
    } = req.body;

    console.log(req.body);

    if (
      !customerId ||
      !deliveryAddress ||
      !shippingFee ||
      !subTotal ||
      !grandTotalPrice ||
      !items ||
      !paymentMethod
    ) {
      return next(new ErrorHandler("Something is missing in your order", 401));
    }

    console.log("promise saved");
    console.log(req.body);

    const orderData = await Order.create({
      orderId: seqId,
      customerId: customerId,
      deliveryAddress,
      customerShippingFee: shippingFee,
      subTotal,
      couponDiscountCode,
      discountPrice,
      deviceType,
      grandTotalPrice,
      items,
      paymentMethod,
      status: {
        statusName: "Recieved",
        statusDate: Date.now(),
        statusComment: "we will confirm the order soon.",
      },
    });

    console.log("order created");

    if (!orderData) {
      return next(new ErrorHandler("Order not placed", 404));
    } else {
      res.status(201).json({
        success: true,
        data: orderData,
      });
    }
  }
);

export const getSearchedOrders = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, category, price, sort, customerId } = req.query;

    console.log(req.query);

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search, //regex for search pattern not the exect match
        $options: "i", //i for case insensitive
      };
    }

    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      // Check if category is a string or an array
      if (typeof category === "string") {
        baseQuery.category = category;
      }
      // else if (Array.isArray(category)) {
      //   // If category is an array, search for documents with categories in the array
      //   baseQuery.category = { $in: category };
      // }
    }

    // Add condition to filter orders by customer ID if it's provided
    if (customerId) {
      console.log("customerId", customerId);
      baseQuery.customerId = customerId;
    }

    // -1 or desending , 1 for ascending
    const productPromise = Order.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip)
      .populate("customerId");

    // since we have 2 awaits for 2 queries .. so we use Promise.all() to execture them concurrently
    const [Items, filteredOnlyProducts] = await Promise.all([
      productPromise,
      Order.find(baseQuery),
      // Only filtered Products to get the length of products with filter
    ]);

    const totalOrders = Math.ceil(filteredOnlyProducts.length);
    const totalPage = Math.ceil(filteredOnlyProducts.length / limit);

    return res.status(200).json({
      success: true,
      Items,
      totalOrders,
      totalPage,
    });
  }
);
export const getOrderSummaryReport = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(24, 0, 0, 0));
    const last30Days = new Date(today.setDate(today.getDate() - 30));
    const completeYear = new Date();
    completeYear.setMonth(completeYear.getMonth() - 11);
    completeYear.setDate(1);
    completeYear.setHours(0, 0, 0, 0);

    const summaryPipeline = [
      {
        $facet: {
          today: [
            {
              $match: {
                placedOn: {
                  $gte: startOfToday,
                  $lt: endOfToday,
                },
              },
            },
            {
              $group: {
                _id: null,
                totalOrdersToday: { $sum: 1 },
                totalSaleToday: { $sum: "$grandTotalPrice" },
              },
            },
          ],
          last30Days: [
            {
              $match: {
                placedOn: {
                  $gte: last30Days,
                },
              },
            },
            {
              $group: {
                _id: null,
                totalOrdersLast30Days: { $sum: 1 },
                totalSaleLast30Days: { $sum: "$grandTotalPrice" },
              },
            },
          ],
          overall: [
            {
              $group: {
                _id: null,
                totalOrderOverall: { $sum: 1 },
                totalSaleOverall: { $sum: "$grandTotalPrice" },
                highestOrderValueOverall: { $max: "$grandTotalPrice" },
                averageOrderValueOverall: { $avg: "$grandTotalPrice" },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalOrdersToday: { $arrayElemAt: ["$today.totalOrdersToday", 0] },
          totalSaleToday: { $arrayElemAt: ["$today.totalSaleToday", 0] },
          totalOrdersLast30Days: {
            $arrayElemAt: ["$last30Days.totalOrdersLast30Days", 0],
          },
          totalSaleLast30Days: {
            $arrayElemAt: ["$last30Days.totalSaleLast30Days", 0],
          },
          totalOrderOverall: {
            $arrayElemAt: ["$overall.totalOrderOverall", 0],
          },
          totalSaleOverall: { $arrayElemAt: ["$overall.totalSaleOverall", 0] },
          averageOrderValueOverall: {
            $arrayElemAt: ["$overall.averageOrderValueOverall", 0],
          },
          highestOrderValueOverall: {
            $arrayElemAt: ["$overall.highestOrderValueOverall", 0],
          },
        },
      },
    ];

    const deviceTypeSummaryPipeline: mongoose.PipelineStage[] = [
      {
        $group: {
          _id: "$deviceType",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          deviceTypes: {
            $push: { deviceType: "$_id", totalOrders: "$totalOrders" },
          },
        },
      },
      {
        $project: {
          deviceTypes: {
            $map: {
              input: ["Desktop", "Mobile", "Tablet"],
              as: "deviceType",
              in: {
                deviceType: "$$deviceType",
                totalOrders: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$deviceTypes",
                            cond: {
                              $eq: ["$$this.deviceType", "$$deviceType"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                    { deviceType: "$$deviceType", totalOrders: 0 },
                  ],
                },
              },
            },
          },
        },
      },
      { $unwind: "$deviceTypes" },
      { $replaceRoot: { newRoot: "$deviceTypes" } },
    ];

    // This Year customer
    const newCustomersPipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          createdAt: { $gte: completeYear },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalNewCustomers: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          monthlyData: {
            $push: {
              year: "$_id.year",
              month: "$_id.month",
              totalNewCustomers: "$totalNewCustomers",
            },
          },
        },
      },
      {
        $project: {
          monthlyData: {
            $map: {
              input: Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                return {
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                };
              }).reverse(),
              as: "date",
              in: {
                year: "$$date.year",
                month: "$$date.month",
                totalNewCustomers: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$monthlyData",
                            as: "data",
                            cond: {
                              $and: [
                                { $eq: ["$$data.year", "$$date.year"] },
                                { $eq: ["$$data.month", "$$date.month"] },
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                    {
                      year: "$$date.year",
                      month: "$$date.month",
                      totalNewCustomers: 0,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $unwind: "$monthlyData",
      },
      {
        $replaceRoot: { newRoot: "$monthlyData" },
      },
    ];

    // Order Status Summary
    const orderStatusSummaryPipeline: mongoose.PipelineStage[] = [
      {
        $unwind: "$status",
      },
      {
        $group: {
          _id: "$status.statusName",
          totalOrders: { $sum: 1 },
          totalValue: { $sum: "$grandTotalPrice" },
        },
      },
      {
        $group: {
          _id: null,
          statuses: {
            $push: {
              status: "$_id",
              totalOrders: "$totalOrders",
              totalValue: "$totalValue",
            },
          },
        },
      },
      {
        $project: {
          statuses: {
            $map: {
              input: [
                "New Order",
                "On Delivery",
                "Delivered",
                "Cancelled",
                "In Process",
              ], // List all possible statuses here
              as: "status",
              in: {
                status: "$$status",
                totalOrders: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$statuses",
                            cond: { $eq: ["$$this.status", "$$status"] },
                          },
                        },
                        0,
                      ],
                    },
                    { status: "$$status", totalOrders: 0, totalValue: 0 },
                  ],
                },
                totalValue: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$statuses",
                            cond: { $eq: ["$$this.status", "$$status"] },
                          },
                        },
                        0,
                      ],
                    },
                    { status: "$$status", totalOrders: 0, totalValue: 0 },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $unwind: "$statuses",
      },
      {
        $replaceRoot: { newRoot: "$statuses" },
      },
    ];

    // TOp today sale item
    //     const startOfToday = new Date();
    // startOfToday.setHours(0, 0, 0, 0);

    // const endOfToday = new Date();
    // endOfToday.setHours(23, 59, 59, 999);

    const trendingItemsPipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          placedOn: {
            $gte: startOfToday,
            $lt: endOfToday,
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.name",
          totalOrders: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.finalPrice" },
          productDetails: { $first: "$items" },
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          productName: "$_id",
          totalOrders: 1,
          totalRevenue: 1,
          productDetails: 1,
        },
      },
    ];

    const topItemsPipeline: mongoose.PipelineStage[] = [
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ];

    const dailySalesAndOrdersPipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          placedOn: {
            $gte: last30Days,
            $lt: endOfToday,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$placedOn",
            },
          },
          totalSales: { $sum: "$grandTotalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $group: {
          _id: null,
          dates: {
            $push: {
              date: "$_id",
              totalSales: "$totalSales",
              totalOrders: "$totalOrders",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          dates: {
            $map: {
              input: {
                $range: [0, 30],
              },
              as: "dayOffset",
              in: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: {
                      $dateAdd: {
                        startDate: last30Days,
                        unit: "day",
                        amount: "$$dayOffset",
                      },
                    },
                  },
                },
                totalSales: {
                  $let: {
                    vars: {
                      matchedDay: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$dates",
                              as: "day",
                              cond: {
                                $eq: [
                                  "$$day.date",
                                  {
                                    $dateToString: {
                                      format: "%Y-%m-%d",
                                      date: {
                                        $dateAdd: {
                                          startDate: last30Days,
                                          unit: "day",
                                          amount: "$$dayOffset",
                                        },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: {
                      $ifNull: ["$$matchedDay.totalSales", 0],
                    },
                  },
                },
                totalOrders: {
                  $let: {
                    vars: {
                      matchedDay: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$dates",
                              as: "day",
                              cond: {
                                $eq: [
                                  "$$day.date",
                                  {
                                    $dateToString: {
                                      format: "%Y-%m-%d",
                                      date: {
                                        $dateAdd: {
                                          startDate: last30Days,
                                          unit: "day",
                                          amount: "$$dayOffset",
                                        },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: {
                      $ifNull: ["$$matchedDay.totalOrders", 0],
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unwind: "$dates",
      },
      {
        $replaceRoot: { newRoot: "$dates" },
      },
    ];

    // Payment Type Status
    const paymentTypeSummaryPipeline: mongoose.PipelineStage[] = [
      {
        $group: {
          _id: "$paymentMethod",
          totalOrders: { $sum: 1 },
          totalSales: { $sum: "$grandTotalPrice" },
        },
      },
      {
        $group: {
          _id: null,
          paymentTypes: {
            $push: {
              paymentType: "$_id",
              totalOrders: "$totalOrders",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $project: {
          paymentTypes: {
            $map: {
              input: ["CASH ON DELIVERY", "CARD"], // List all possible payment types here
              as: "paymentType",
              in: {
                paymentType: "$$paymentType",
                totalOrders: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$paymentTypes",
                            cond: {
                              $eq: ["$$this.paymentType", "$$paymentType"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                    {
                      paymentType: "$$paymentType",
                      totalOrders: 0,
                      totalSales: 0,
                    },
                  ],
                },
                totalSales: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$paymentTypes",
                            cond: {
                              $eq: ["$$this.paymentType", "$$paymentType"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                    {
                      paymentType: "$$paymentType",
                      totalOrders: 0,
                      totalSales: 0,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      { $unwind: "$paymentTypes" },
      { $replaceRoot: { newRoot: "$paymentTypes" } },
    ];

    // Delivery Type Status
    const deliveryTypeSummaryPipeline: mongoose.PipelineStage[] = [
      {
        $group: {
          _id: "$deliveryType",
          totalOrders: { $sum: 1 },
          totalSales: { $sum: "$grandTotalPrice" },
        },
      },
      {
        $group: {
          _id: null,
          deliveryTypes: {
            $push: {
              deliveryType: "$_id",
              totalOrders: "$totalOrders",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $project: {
          deliveryTypes: {
            $map: {
              input: ["Delivery", "Pickup"], // List all possible delivery types here
              as: "deliveryType",
              in: {
                deliveryType: "$$deliveryType",
                totalOrders: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$deliveryTypes",
                            cond: {
                              $eq: ["$$this.deliveryType", "$$deliveryType"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                    {
                      deliveryType: "$$deliveryType",
                      totalOrders: 0,
                      totalSales: 0,
                    },
                  ],
                },
                totalSales: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$deliveryTypes",
                            cond: {
                              $eq: ["$$this.deliveryType", "$$deliveryType"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                    {
                      deliveryType: "$$deliveryType",
                      totalOrders: 0,
                      totalSales: 0,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      { $unwind: "$deliveryTypes" },
      { $replaceRoot: { newRoot: "$deliveryTypes" } },
    ];

    // live Order Management
    // Combined aggregation pipeline
    // Combined aggregation pipeline
    const aggregationPipeline: mongoose.PipelineStage[] = [
      {
        $facet: {
          allProducts: [
            { $match: { placedOn: { $gte: startOfToday, $lt: endOfToday } } },
            { $unwind: "$items" },
            {
              $group: {
                _id: "$items.name",
                totalOrders: { $sum: "$items.quantity" },
                statuses: {
                  $push: "$status",
                },
                productImage: { $first: "$items.productImage.url" },
                name: { $first: "$items.name" },
                description: { $first: "$items.description" },
                price: { $first: "$items.finalPrice" },
              },
            },
            { $unwind: "$statuses" },
            { $unwind: "$statuses" },
            {
              $group: {
                _id: "$_id",
                totalOrders: { $first: "$totalOrders" },
                productImage: { $first: "$productImage" },
                name: { $first: "$name" },
                description: { $first: "$description" },
                price: { $first: "$price" },
                statuses: {
                  $push: "$statuses.statusName",
                },
              },
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                totalOrders: 1,
                productImage: 1,
                description: 1,
                price: 1,
                statuses: {
                  $arrayToObject: {
                    $map: {
                      input: [
                        "Recieved",
                        "On-Delivery",
                        "Delivered",
                        "Cancelled",
                        "Process",
                      ],
                      as: "status",
                      in: {
                        k: "$$status",
                        v: {
                          $ifNull: [
                            {
                              $size: {
                                $filter: {
                                  input: "$statuses",
                                  cond: { $eq: ["$$this", "$$status"] },
                                },
                              },
                            },
                            0,
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      { $unwind: "$allProducts" },
      { $replaceRoot: { newRoot: "$allProducts" } },
    ];

    const [
      summary,
      totalCustomers,
      totalMenus,
      deviceType,
      newCustomersThisYear,
      orderStatusSummary,
      todayTopSaleItems,
      topItems,
      dailySalesAndOrders,
      paymentTypeSummary,
      deliveryTypeSummary,
      liveOrderSummary,
    ] = await Promise.all([
      Order.aggregate(summaryPipeline).exec(),
      Customer.countDocuments(),
      Item.countDocuments(),
      Order.aggregate(deviceTypeSummaryPipeline).exec(),
      Customer.aggregate(newCustomersPipeline),
      Order.aggregate(orderStatusSummaryPipeline),
      Order.aggregate(trendingItemsPipeline),
      Order.aggregate(topItemsPipeline).exec(),
      Order.aggregate(dailySalesAndOrdersPipeline).exec(),
      Order.aggregate(paymentTypeSummaryPipeline).exec(),
      Order.aggregate(deliveryTypeSummaryPipeline).exec(),
      Order.aggregate(aggregationPipeline).exec(),
    ]);

    // Extract and format the result
    // const topProduct = liveOrderSummary.topProduct;
    // const productStatuses = liveOrderSummary.productStatuses;
    // const productDetails = liveOrderSummary.productDetails;

    const result = {
      topBarSummary: {
        totalOrdersToday: summary[0]?.totalOrdersToday || 0,
        totalSaleToday: summary[0]?.totalSaleToday || 0,
        totalOrderLast30Days: summary[0]?.totalOrdersLast30Days || 0,
        totalSaleLast30Days: summary[0]?.totalSaleLast30Days || 0,
        totalOrderOverall: summary[0]?.totalOrderOverall || 0,
        totalSaleOverall: summary[0]?.totalSaleOverall || 0,
        averageOrderValueOverall: summary[0]?.averageOrderValueOverall || 0,
        highestOrderValueOverall: summary[0]?.highestOrderValueOverall || 0,
        totalCustomers: totalCustomers,
        totalMenus: totalMenus,
      },
      deviceType: deviceType,
      newCustomersThisYear: newCustomersThisYear,
      orderStatusSummary: orderStatusSummary,
      todayTopSaleItems: todayTopSaleItems,
      topItems: topItems.map((item) => ({
        name: item._id,
        totalQuantity: item.totalQuantity,
      })),
      dailySalesAndOrders,
      paymentTypeSummary,
      deliveryTypeSummary,
      liveOrderSummary,
    };

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
);

// export const getOrderDeviceType = TryCatch(
//   async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
//     // Get today's date and the date 30 days ago
//     const today = new Date();
//     const startOfToday = new Date(today.setHours(0, 0, 0, 0));
//     const endOfToday = new Date(today.setHours(24, 0, 0, 0));
//     const last30Days = new Date();
//     last30Days.setDate(today.getDate() - 30);

//     // Aggregation pipeline
//     const summaryPipeline = [
//       {
//         $facet: {
//           today: [
//             {
//               $match: {
//                 placedOn: {
//                   $gte: startOfToday,
//                   $lt: endOfToday,
//                 },
//               },
//             },
//             {
//               $group: {
//                 _id: null,
//                 totalOrdersToday: { $sum: 1 },
//                 totalSaleToday: { $sum: "$grandTotalPrice" },
//               },
//             },
//           ],
//           last30Days: [
//             {
//               $match: {
//                 placedOn: {
//                   $gte: last30Days,
//                 },
//               },
//             },
//             {
//               $group: {
//                 _id: null,
//                 totalOrdersLast30Days: { $sum: 1 },
//                 totalSaleLast30Days: { $sum: "$grandTotalPrice" },
//               },
//             },
//           ],
//           overall: [
//             {
//               $group: {
//                 _id: null,
//                 totalOrderOverall: { $sum: 1 },
//                 totalSaleOverall: { $sum: "$grandTotalPrice" },
//                 highestOrderValueOverall: { $max: "$grandTotalPrice" },
//                 averageOrderValueOverall: { $avg: "$grandTotalPrice" },
//               },
//             },
//           ],
//         },
//       },
//       {
//         $project: {
//           totalOrdersToday: { $arrayElemAt: ["$today.totalOrdersToday", 0] },
//           totalSaleToday: { $arrayElemAt: ["$today.totalSaleToday", 0] },
//           totalOrdersLast30Days: {
//             $arrayElemAt: ["$last30Days.totalOrdersLast30Days", 0],
//           },
//           totalSaleLast30Days: {
//             $arrayElemAt: ["$last30Days.totalSaleLast30Days", 0],
//           },
//           totalOrderOverall: {
//             $arrayElemAt: ["$overall.totalOrderOverall", 0],
//           },
//           totalSaleOverall: {
//             $arrayElemAt: ["$overall.totalSaleOverall", 0],
//           },
//           averageOrderValueOverall: {
//             $arrayElemAt: ["$overall.averageOrderValueOverall", 0],
//           },
//           highestOrderValueOverall: {
//             $arrayElemAt: ["$overall.highestOrderValueOverall", 0],
//           },
//         },
//       },
//     ];
//     // Aggregation pipeline for top 10 items
//     const topItemsPipeline: mongoose.PipelineStage[] = [
//       { $unwind: "$items" },
//       {
//         $group: {
//           _id: "$items.name",
//           totalQuantity: { $sum: "$items.quantity" },
//         },
//       },
//       { $sort: { totalQuantity: -1 } },
//       { $limit: 10 },
//     ];

//     // Aggregation pipeline for daily sales amount and orders in the last 30 days
//     const dailySalesAndOrdersPipeline: mongoose.PipelineStage[] = [
//       {
//         $match: {
//           placedOn: {
//             $gte: last30Days,
//             $lt: endOfToday,
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$placedOn",
//             },
//           },
//           totalSales: { $sum: "$grandTotalPrice" },
//           totalOrders: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ];

//     // Execute the aggregations concurrently
//     const [summary, deviceType, topItems, dailySalesAndOrders] =
//       await Promise.all([
//         Order.aggregate(summaryPipeline).exec(),
//         await Order.aggregate(deviceTypeSummaryPipeline),
//         Order.aggregate(topItemsPipeline).exec(),
//         Order.aggregate(dailySalesAndOrdersPipeline).exec(),
//       ]);

//     // Ensure that the fields are present, default to 0 if not
//     const result = {
//       totalOrdersToday: summary[0]?.totalOrdersToday || 0,
//       totalSaleToday: summary[0]?.totalSaleToday || 0,
//       totalOrderLast30Days: summary[0]?.totalOrdersLast30Days || 0,
//       totalSaleLast30Days: summary[0]?.totalSaleLast30Days || 0,
//       totalOrderOverall: summary[0]?.totalOrderOverall || 0,
//       totalSaleOverall: summary[0]?.totalSaleOverall || 0,
//       averageOrderValueOverall: summary[0]?.averageOrderValueOverall || 0,
//       hightestOrderValueOverall: summary[0]?.highestOrderValueOverall || 0,
//       deviceType: deviceType,
//       topItems: topItems.map((item) => ({
//         name: item._id,
//         totalQuantity: item.totalQuantity,
//       })),
//       dailySalesAndOrders,
//     };

//     return res.status(200).json({
//       success: true,
//       data: result,
//     });
//   }
// );
