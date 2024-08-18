import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please provide item id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide item name"],
    },
    brandName: {
      type: String,
      required: [true, "Please provide brand name"],
    },
    description: {
      type: String,
      required: [true, "Please provide item description"],
    },
    productImage: {
      url: {
        type: String,
        required: [true, "Please add your photo"],
      },
      blurHash: {
        type: String,
        required: [true, "Something went wrong in image"],
      },
    },
    additionalImages: [
      {
        url: {
          type: String,
        },
        blurHash: {
          type: String,
        },
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    deal: {
      type: Boolean,
      default: false,
    },
    promoCodeOnly: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    upsellingItem: {
      type: Boolean,
      default: false,
    },
    appOnly: {
      type: Boolean,
      default: false,
    },
    deliveryBy: {
      type: String,
      enum: ["vendor", "customer"],
      required: [true, "Please specify who will deliver"],
    },
    priceType: {
      type: String,
      enum: ["fixed", "starting from"],
      default: "fixed",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
      default: 0,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed amount"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price must be a positive number"],
      default: 0,
    },
    preparationTime: {
      type: Number, // In minutes
      required: [true, "Please specify preparation time"],
      min: [0, "Preparation time must be a positive number"],
    },
    calories: {
      type: Number,
    },
    barcode: {
      type: String,
    },
    sku: {
      type: String,
    },
    uom: {
      type: String, // Unit of Measure
    },
    skuPosMappingId: {
      type: String,
    },
    priority: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    allergens: [
      {
        type: String,
      },
    ],
    // Uncomment if you decide to use these fields
    // availableTimeSlots: [
    //   {
    //     startTime: String,
    //     endTime: String,
    //   },
    // ],
    // stockQuantity: {
    //   type: Number,
    //   default: 0,
    //   min: [0, "Stock quantity must be a positive number"],
    // },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", itemSchema);
