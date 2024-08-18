const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  XAG: { type: Number },
  XAU: { type: Number },
});
const historicalRatesModel = new mongoose.Schema(
  {
    success: {
      type: Boolean,
      required: true,
    },
    base: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    rates: {
      type: Map,
      of: rateSchema,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("historicalRates", historicalRatesModel);
