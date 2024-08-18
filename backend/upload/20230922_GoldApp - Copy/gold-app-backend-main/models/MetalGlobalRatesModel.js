const mongoose = require("mongoose");

const MetalRatesGlobal = new mongoose.Schema(
  {
    Gold: {
      type: Number,
      required: true,
    },
    GoldHigh: {
      type: Number,
      required: true,
    },
    GoldLow: {
      type: Number,
      required: true,
    },
    Silver: {
      type: Number,
      required: true,
    },
    SilverHigh: {
      type: Number,
      required: true,
    },
    SilverLow: {
      type: Number,
      required: true,
    },
    XPD: {
      type: Number,
      required: true,
    },
    XPDHigh: {
      type: Number,
      required: true,
    },
    XPDLow: {
      type: Number,
      required: true,
    },
    XPT: {
      type: Number,
      required: true,
    },
    XPTHigh: {
      type: Number,
      required: true,
    },
    XPTLow: {
      type: Number,
      required: true,
    },
    TRY: {
      type: Number,
      required: true,
    },
    TRYHigh: {
      type: Number,
      required: true,
    },
    TRYLow: {
      type: Number,
      required: true,
    },
    USD: {
      type: Number,
      required: true,
    },
    USDHigh: {
      type: Number,
      required: true,
    },
    USDLow: {
      type: Number,
      required: true,
    },
    GBP: {
      type: Number,
      required: true,
    },
    GBPHigh: {
      type: Number,
      required: true,
    },
    GBPLow: {
      type: Number,
      required: true,
    },
    CNY: {
      type: Number,
      required: true,
    },
    CNYHigh: {
      type: Number,
      required: true,
    },
    CNYLow: {
      type: Number,
      required: true,
    },
    EUR: {
      type: Number,
      required: true,
    },
    EURHigh: {
      type: Number,
      required: true,
    },
    EURLow: {
      type: Number,
      required: true,
    },
    CAD: {
      type: Number,
      required: true,
    },
    CADHigh: {
      type: Number,
      required: true,
    },
    CADLow: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MetalRatesGlobal", MetalRatesGlobal);
