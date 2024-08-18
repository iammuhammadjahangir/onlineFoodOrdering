const mongoose = require("mongoose");
const ProductAndColor = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color", // Reference to the "shop" collection
    //   alias: "color", // Alias for the "shopAvalibility" field
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("productAndColor", ProductAndColor);
