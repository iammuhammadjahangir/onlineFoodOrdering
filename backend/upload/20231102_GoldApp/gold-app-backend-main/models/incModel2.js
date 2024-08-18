const mongoose = require("mongoose");
const incSchema2 = mongoose.Schema({
  autoVal: {
    type: String,
  },
  seq: {
    type: Number,
    required: true,
  },
});

const incModel2 = mongoose.model("inc2", incSchema2, "inc2");
module.exports = incModel2;
