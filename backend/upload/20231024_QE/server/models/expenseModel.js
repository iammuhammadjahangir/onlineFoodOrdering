const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
    },
    expenseLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
    },
    expenseCategory: {
      type: String,
    },
    expenses: [
      {
        expenseType: {
          type: String,
        },
        expenseAmount: {
          type: Number,
        },
        expenseDescription: {
          type: String,
        },
      },
    ],
    expenseTotal: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const expenseModel = mongoose.model("expense", expenseSchema);

module.exports = expenseModel;
