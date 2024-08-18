const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  roleDescription: {
    type: String,
  },
});

module.exports = mongoose.model("role", roleSchema);
