const mongoose = require("mongoose");
const transferProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    tranferFrom: {
      type: String,
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transferSalesProduct", transferProductSchema);
