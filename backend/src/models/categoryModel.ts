import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is Required"],
    },
    description: {
      type: String,
      required: [true, "Please Provide Category Description"],
    },
    priority: {
      type: Number,
      default: 1,
    },
    availableFrom: {
      type: String, // You can also use Date if you prefer date-time handling
      required: [true, "Start time is required"],
    },
    availableTo: {
      type: String, // You can also use Date if you prefer date-time handling
      required: [true, "End time is required"],
    },
    appOnly: {
      type: Boolean,
      default: false,
    },
    branchID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
      },
    ],
    status: {
      type: [String], // Array of strings to store multiple days
      required: [
        true,
        "Please provide the days when the category is available",
      ],
    },
    image: {
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
      blurHash: {
        type: String,
        required: [true, "Blurhash is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
