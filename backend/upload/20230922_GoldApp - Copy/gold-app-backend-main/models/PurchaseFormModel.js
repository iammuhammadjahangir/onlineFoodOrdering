const mongoose = require("mongoose");

const purchaseFormSchema = mongoose.Schema(
  {
    customer: {
      type: String,
    },
    pondWeight: {
      type: Number,
      default: 0,
    },
    mail: {
      type: Number,
      default: 0,
    },
    finalWeight: {
      type: Number,
      default: 0,
    },
    gramRate: {
      type: Number,
      default: 0,
    },
    pureWeight: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      default: 0,
    },
    cash: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
    },
    reportID: {
      type: String,
      require: true,
    },
    sellerName: {
      type: String,
    },
    ratti: {
      type: Number,
      default: 0,
    },
    milli: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
    },
    deleteStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const purchaseFormModel = mongoose.model(
  "purchaseFormData",
  purchaseFormSchema,
  "purchaseFormData"
);

module.exports = purchaseFormModel;
