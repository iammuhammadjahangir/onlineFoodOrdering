const mongoose = require("mongoose");

const expenseTypeSchema = mongoose.Schema(
  {
    expenseType: {
      type: String,
    },
    expenseDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("expenseType", expenseTypeSchema);
