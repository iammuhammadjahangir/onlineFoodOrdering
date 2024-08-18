const mongoose = require("mongoose");

const tempSalesProductSchema = new mongoose.Schema(
  {
    shopNo: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
    },
    customerNumber: {
      type: Number,
    },
    shopId: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: Number,
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
        productColor: {
          type: String,
        },
        shopIdForData: {
          type: String,
        },
        Discount: {
          type: String,
        },
        taxPercentage: {
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

module.exports = mongoose.model("tempSalesProduct", tempSalesProductSchema);
