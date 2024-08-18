const mongoose = require("mongoose");

const PurchaseIncrementSchema = {
  id: { type: String },
  seq: { type: Number },
};

module.exports = mongoose.model("incrementPurchase", PurchaseIncrementSchema);
