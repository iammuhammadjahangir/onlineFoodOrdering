const mongoose = require("mongoose");

const salesProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    invoiceNumber: {
      type: String,
    },
    shopNo: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    saleBy: {
      type: String,
    },
    products: [
      {
        id: {
          type: String,
        },
        Code: {
          type: String,
        },
        color: {
          type: String,
        },
        Namee: {
          type: String,
        },
        Company: {
          type: String,
        },
        PurchaseQuantity: {
          type: Number,
        },
        amount: {
          type: Number,
        },
        quantityidset: {
          type: String,
        },
        locationsetid: {
          type: String,
        },
        Discount: {
          type: String,
        },
        excludeTaxPrice: {
          type: String,
        },
        totalAmounnt: {
          type: String,
        },
        taxAmount: {
          type: String,
        },
      },
    ],
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("salesProduct", salesProductSchema);
