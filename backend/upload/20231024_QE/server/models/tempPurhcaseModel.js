const mongoose = require("mongoose");
const tempPurchaseProductSchema = new mongoose.Schema(
  {
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
    address: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    storeIn: {
      type: String,
    },
    shopId: {
      type: String,
    },
    godownId: {
      type: String,
    },
    purchasedBy: {
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
        purchaseProductPriceExcludeTax: {
          type: Number,
        },
        purchaseProductDiscount: {
          type: Number,
        },
        purchaseProductExpense: {
          type: Number,
        },
        purchaseProductTax: {
          type: Number,
        },
        purchaseTotalAmount: {
          type: Number,
        },
        amount: {
          type: Number,
        },
        productColor: {
          type: String,
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
module.exports = mongoose.model(
  "tempPurchaseProduct",
  tempPurchaseProductSchema
);
