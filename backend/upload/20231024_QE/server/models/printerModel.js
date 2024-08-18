const mongoose = require("mongoose");

const printerSchema = mongoose.Schema({
  printerName: {
    type: String,
    required: [true, "Please Enter Your Printer Name"]
  },
  printerType: {
    type: String,
    required: [true, "Please Enter Your Printer Type"]
  },
  status: {
    type: String,
    default: "inactive" // Set the default value to "inactive"
  },
});

module.exports = mongoose.model("printer", printerSchema);
