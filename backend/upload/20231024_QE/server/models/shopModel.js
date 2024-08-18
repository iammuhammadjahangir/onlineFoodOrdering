const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  shopCode: {
    type: String,
    unique: [true, 'shop Should be unique'],
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopDescription: {
    type: String,
    required: true,
  },
  shopType: {
    type: String,
    required: false,
  },
  shopPhoneNo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("shop", shopSchema);
