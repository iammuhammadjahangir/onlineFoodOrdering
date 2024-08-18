import mongoose from "mongoose";
import validator from "validator";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Something went wrong"],
    },
    placedOn: {
      type: Date,
      default: Date.now,
    },
    customerId: {
      type: String,
      ref: "customer",
    },
    deviceType: {
      type: String,
      // required: [true, "Please provide device type"],
    },
    deliveryType: {
      type: String,
      enum: ["Delivery", "Pickup"],
      default: "Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    paymentDate: {
      type: Date,
    },
    TrackingNumber: {
      type: String,
    },
    ShippedCompany: {
      type: String,
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productDetails",
          required: [true, "Please provide product Details ID"],
        },
        name: {
          type: String,
          required: [true, "Please provide product name"],
        },
        description: {
          type: String,
          required: [true, "Please provide product description"],
        },
        actualPrice: {
          type: Number,
          required: [true, "Please provide actual price"],
        },
        offerPrice: {
          type: Number,
          required: [true, "Please provide offer price"],
        },
        finalPrice: {
          type: Number,
          required: [true, "Please provide final price"],
        },
        productImage: {
          url: {
            type: String,
            required: [true, "please add your photo"],
          },
          blurHash: {
            type: String,
            required: [true, "Something went wrong in image"],
          },
        },
        variations: [
          {
            type: mongoose.Schema.Types.Mixed,
          },
        ],
        quantity: {
          type: Number,
          required: [true, "Please provide quantity"],
        },
        variationOptions: [
          {
            type: mongoose.Schema.Types.Mixed,
          },
        ],
        variationRequired: [
          {
            type: mongoose.Schema.Types.Mixed,
          },
        ],
      },
    ],
    deliveryAddress: {
      addressDetail: {
        type: String,
        required: [true, "Please provide address"],
      },
      city: {
        type: String,
        required: [true, "Please provide city"],
      },
      area: {
        type: String,
        required: [true, "Please provide state"],
      },
    },
    customerShippingFee: {
      type: Number,
      required: [true, "Please provide shipping fee"],
    },
    ownerShippingFee: {
      type: Number,
      default: 0,
    },
    couponDiscountCode: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["CASH ON DELIVERY", "CARD"],
      default: "CASH ON DELIVERY",
      required: [true, "Please provide payment method"],
    },
    subTotal: {
      type: Number,
      required: [true, "Please provide sub total"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Please provide discount price"],
    },
    grandTotalPrice: {
      type: Number,
      required: [true, "Please provide grand total price"],
    },
    status: [
      {
        statusName: {
          type: String,
          enum: [
            "Recieved",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Returned",
            "Cancelled",
            "On-Delivery",
            "Delivered",
            "cancelled",
            "process",
          ],
          default: "Recieved",
        },
        statusDate: {
          type: Date,
          default: Date.now,
        },
        statusComment: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("order", orderSchema);
