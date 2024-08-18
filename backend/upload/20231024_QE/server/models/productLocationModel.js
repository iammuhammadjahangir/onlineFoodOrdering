const mongoose = require("mongoose");
const product = require('./productModel')
const shop = require('./shopModel');
const godown = require('./godownModel')
const ProductLocation = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },
    shopAvalibility: {
      type: mongoose.Schema.Types.Mixed,
      ref: "shop", // Reference to the "shop" collection
      alias: "shop", // Alias for the "shopAvalibility" field
    },
    godownAvalibility: {
      type: mongoose.Schema.Types.Mixed,
      ref: "godown", // Reference to the "godown" collection
      alias: "godown", // Alias for the "godownAvalibility" field
    },
    productQuantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("productLoc", ProductLocation);
