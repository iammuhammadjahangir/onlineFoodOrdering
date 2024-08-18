const mongoose = require("mongoose");

const expenseCounterSchema = {
  id: { type: String },
  seq: { type: Number },
};

const expenseCounterModel = mongoose.model(
  "expenseCounter",
  expenseCounterSchema
);

module.exports = expenseCounterModel;
