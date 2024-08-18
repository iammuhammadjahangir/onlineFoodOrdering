const mongoose = require("mongoose");

const tableSettingSchema = mongoose.Schema({
  noOfRows: {
    type: Number,
    required: [true, "Please Enter Your Printer Name"]
  }
});

module.exports = mongoose.model("tableSetting", tableSettingSchema);
