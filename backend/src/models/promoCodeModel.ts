import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    promoCode: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    forFirstTimeOnly: {
      type: Boolean,
      required: true,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    maxCountPerUser: {
      type: Number,
      required: true,
    },
    discountType: {
      type: String,
      enum: ["Flat", "Percentage"],
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    minimumOrderAmount: {
      type: Number,
      // required: true,
    },
    orderType: {
      type: String,
      enum: ["Delivery", "Pickup", "Both"],
      required: true,
    },
    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
      },
    ],
    applicableOnSections: [
      {
        type: mongoose.Schema.Types.Mixed,
        ref: "category",
      },
    ],
    freeProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    specificCustomer: [
      {
        type: mongoose.Schema.Types.Mixed, // Boolean or CSV of customer IDs
        ref: "customer",
      },
    ],
    applicableOn: {
      type: String,
      enum: ["App", "Web", "Both"],
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
