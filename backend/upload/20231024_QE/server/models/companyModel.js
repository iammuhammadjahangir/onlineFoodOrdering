const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyID: {
    type: String,
  },
  companyName: {
    type: String,
    required: [true, "Please Enter Company Name"]
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("company", companySchema);
