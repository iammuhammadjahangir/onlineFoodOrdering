const mongoose = require("mongoose");
const employeCommissionSchema = new mongoose.Schema(
  {
    employeName: {
      type: String,
    },
    totalCommission: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    shopNo: {
      type: String,
    },
    record: [
      {
        productCode: {
          type: String,
        },
        productName: {
          type: String,
        },
        productCompany: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        Price: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
        taxAmount: {
          type: Number,
        },
        totalAmount: {
          type: Number,
        },
        commission: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("employeCommission", employeCommissionSchema);
