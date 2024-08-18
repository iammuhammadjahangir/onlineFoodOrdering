import mongoose from "mongoose";

const IncrementSchema = new mongoose.Schema({
  id: { type: String },
  seq: { type: Number },
});

export const IncrementIDs = mongoose.model("IncrementIDs", IncrementSchema);
