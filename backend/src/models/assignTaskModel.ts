import mongoose from "mongoose";

const roleTasks = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const AssignTask = mongoose.model("assignedTask", roleTasks);
