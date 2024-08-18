import mongoose from "mongoose";

const banner = new mongoose.Schema(
  {
    title: {
      type: String,
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
    priority: {
      type: String,
      required: true,
    },
    linkedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    branches: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "branch",
      required: true,
    },
    appBannerImage: {
      url: {
        type: String,
        // required: [true, "please add your photo"],
      },
      blurHash: {
        type: String,
        // required: [true, "Something went wrong in image"],
      },
    },
    webBannerImage: {
      url: {
        type: String,
        // required: [true, "please add your photo"],
      },
      blurHash: {
        type: String,
        // required: [true, "Something went wrong in image"],
      },
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

export const BannerModel = mongoose.model("banner", banner);
