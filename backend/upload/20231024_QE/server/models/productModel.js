const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productTypeName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productType",
    },
    productCode: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    // productColor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "color",
    // },
    productCurrentPrice: {
      type: Number,
      default: 0,
    },
    barcodeValue: {
      type: String,
      required: true,
    },
    productpriceExcludingTax: {
      type: Number,
      default: 0,
    },
    productExpenses: {
      type: Number,
      default: 0,
    },
    productDiscount: {
      type: Number,
      default: 0,
    },
    productTaxPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
