import mongoose from "mongoose";

const bulkCategoryDiscountSchema = new mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
      },
    ],
    brandName: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    disableCategoryAfterExpiry: {
      type: Boolean,
      required: false,
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

export const BulkCategoryDiscount = mongoose.model(
  "BulkCategoryDiscount",
  bulkCategoryDiscountSchema
);
