const mongoose = require("mongoose");
const customerIncrement = new mongoose.Schema({
  autoVal: {
    type: String,
  },
  seq: {
    type: Number,
    required: true,
  },
});
const customerIncrementModel = mongoose.model(
  "customerIncrement",
  customerIncrement,
  "customerIncrement"
);
module.exports = customerIncrementModel;
