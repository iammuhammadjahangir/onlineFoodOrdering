import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Please provide the branch ID"],
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: [true, "Please provide the item ID"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide the category ID"],
    },
    variations: [
      {
        variationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variation", // Assuming you have a separate Variation model
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],
    itemActive: {
      type: Boolean,
      default: true, // Active or inactive for the item at this branch
    },
    categoryActive: {
      type: Boolean,
      default: true, // Active or inactive for the category at this branch
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
