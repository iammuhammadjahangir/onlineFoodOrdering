const mongoose = require("mongoose");

const CustomerFromSchema = mongoose.Schema(
  {
    customerId: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    cellNumber: {
      type: String,
    },
    cnic: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    deletedStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const customerFormModel = mongoose.model(
  "customerForm",
  CustomerFromSchema,
  "customerForm"
);

module.exports = customerFormModel;
