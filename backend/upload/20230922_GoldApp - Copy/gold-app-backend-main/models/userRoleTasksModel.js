const mongoose = require("mongoose");

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

module.exports = mongoose.model("roleTask", roleTasks);
