const mongoose = require("mongoose");

const metalRatesLocal = new mongoose.Schema(
  {
    RawaSale: {
      type: Number,
      required: true,
    },
    RawaPurchase: {
      type: Number,
      required: true,
    },
    RawaHigh: {
      type: Number,
      required: true,
    },
    RawaLow: {
      type: Number,
      required: true,
    },
    PieceSale: {
      type: Number,
      required: true,
    },
    PiecePurchase: {
      type: Number,
      required: true,
    },
    PieceHigh: {
      type: Number,
      required: true,
    },
    PieceLow: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("metalRatesLocal", metalRatesLocal);
