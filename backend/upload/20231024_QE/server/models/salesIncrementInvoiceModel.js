const mongoose = require("mongoose");

const salesIncrementSchema = {
  id: { type: String },
  seq: { type: Number },
};

module.exports = mongoose.model("incrementSales", salesIncrementSchema);
