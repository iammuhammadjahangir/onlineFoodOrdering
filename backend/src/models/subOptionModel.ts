import mongoose from "mongoose";

const subOptionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the sub-option item"],
  },
  price: {
    type: Number,
    required: [true, "Please provide the price of the sub-option item"],
    min: 0,
  },
});

const subOptionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please provide the sub-option id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide the sub-option name"],
    },
    description: {
      type: String,
      default: "",
    },
    itemID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    branchID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
        required: true,
      },
    ],
    isRequired: {
      type: Boolean,
      default: false,
    },
    items: [subOptionItemSchema],
  },
  {
    timestamps: true,
  }
);

export const SubOption = mongoose.model("SubOption", subOptionSchema);
