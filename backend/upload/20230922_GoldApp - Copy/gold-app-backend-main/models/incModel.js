const mongoose = require("mongoose");
const incSchema = mongoose.Schema({
  autoVal: {
    type: String,
  },
  seq: {
    type: Number,
    required: true,
  },
});

const incModel = mongoose.model("inc", incSchema, "inc");
module.exports = incModel;
