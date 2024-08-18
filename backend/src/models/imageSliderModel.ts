import mongoose from "mongoose";

const imageSliderSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  blurHash: String,
  size: Number,
});

export const ImageSlider = mongoose.model("imageSlider", imageSliderSchema);
