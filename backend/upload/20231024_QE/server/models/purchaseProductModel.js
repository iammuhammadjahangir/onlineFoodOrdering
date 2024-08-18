const mongoose = require("mongoose");
const purchaseProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    clientName: {
      type: String,
    },
    purchaseReceiptNumber: {
      type: String,
    },
    purchaseCompany: {
      type: String,
    },
    purchaseDate: {
      type: String,
    },
    shopNo: {
      type: String,
    },
    purchasedBy: {
      type: String,
    },
    storeIn: {
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
        Namee: {
          type: String,
        },
        Company: {
          type: String,
        },
        Color: {
          type: String,
        },
        purchasePrice: {
          type: Number,
        },
        PurchaseQuantity: {
          type: Number,
        },
        purchaseQuantityPrice: {
          type: Number,
        },
        purchaseTotalTax: {
          type: Number,
        },
        expeseTotal: {
          type: Number,
        },
        purchaseTotalDiscount: {
          type: Number,
        },
        purchaseProductTotalAmount: {
          type: Number,
        },
        CurrentPrice: {
          type: Number,
        },
        purchaseTotalAmount: {
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
module.exports = mongoose.model("purchaseProduct", purchaseProductSchema);
