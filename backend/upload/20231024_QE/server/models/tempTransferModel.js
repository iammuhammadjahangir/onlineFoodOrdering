const mongoose = require("mongoose");

const tempTransfer = new mongoose.Schema(
  {
    transferFrom: {
      type: String,
      required: true,
    },
    transferTo: {
      type: String,
    },
    transferBy: {
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
        Namee: {
          type: String,
        },
        Code: {
          type: String,
        },
        PurchaseQuantity: {
          type: String,
        },
        Color: {
          type: String,
        },
        Company: {
          type: String,
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
        transferToShopId: {
          type: String,
        },
        transferToGodownId: {
          type: String,
        },
        transferShopId: {
          type: String,
        },
        transferGodownId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tempTransfer", tempTransfer);
