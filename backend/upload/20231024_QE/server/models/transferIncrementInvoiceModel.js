const mongoose = require("mongoose");

const TransferIncrementSchema = {
  id: { type: String },
  seq: { type: Number },
};

module.exports = mongoose.model("incrementTransfer", TransferIncrementSchema);
