const mongoose = require("mongoose");

const dailyEntrySchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerForm",
    },
    goldIn: {
      type: Number,
      default: 0,
    },
    goldout: {
      type: Number,
      default: 0,
    },
    cashIn: {
      type: Number,
      default: 0,
    },
    cashout: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const dailyEntryModel = mongoose.model(
  "dailyEntry",
  dailyEntrySchema,
  "dailyEntry"
);

module.exports = dailyEntryModel;
