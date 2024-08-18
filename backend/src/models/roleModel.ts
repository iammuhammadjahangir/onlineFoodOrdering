import mongoose from "mongoose";
import { NewRoleType } from "../types/types.js";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export const Role = mongoose.model("role", roleSchema);
