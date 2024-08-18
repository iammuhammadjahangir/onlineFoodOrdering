const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
  colorName: {
    type: String,
    required: [true, "Please Enter Your Name"]
    
  },
  colorDescription: {
    type: String,
  },
});

module.exports = mongoose.model("color", colorSchema);
