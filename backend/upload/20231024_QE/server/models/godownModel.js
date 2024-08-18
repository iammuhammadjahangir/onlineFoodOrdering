const mongoose = require("mongoose");

const godownSchema = mongoose.Schema({
  storageCode: {
    type: String,
    required: true,
  },
  storageAddress: {
    type: String,
    required: true,
  },
  storageDescription: {
    type: String,
    required: true,
  },
  shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
  },
  storageType: {
    type: String,
    // enum: ["shop", "store"],
    required: false,
  },
  storagePhoneNo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("godown", godownSchema);
