import mongoose from "mongoose";

const itemBranch = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    itemID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    branchID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
      },
    ],
    quantity: {
      type: Number,
      default: 0,
    },
    countinueSellingAfterQuantityReached: {
      type: Boolean,
      default: true,
    },
    reorderThreshold: {
      type: Number,
      default: 10,
    },
    batchNumber: {
      type: String,
      default: "",
    },
    expiryDate: {
      type: Date,
    },
    location: {
      type: String,
      default: "",
    },
    dateReceived: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const ItemBranch = mongoose.model("ItemBranch", itemBranch);
