import mongoose from "mongoose";

const wareHouseSchema = new mongoose.Schema({
  wareHouseCode: {
    type: String,
    unique: [true, "wareHouse Should be unique"],
    required: [true, "Please Provide wareHouse Code"],
  },
  wareHouseAddress: {
    type: String,
    required: [true, "Please Provide wareHouse Address"],
  },
  wareHouseDescription: {
    type: String,
    required: [true, "Please Provide wareHouse Description"],
  },
  wareHouseType: {
    type: String,
    enum: ["shop", "store"],
    default: "store",
  },
  wareHousePhoneNo: {
    type: String,
    required: [true, "Please Provide wareHouse Phone Number"],
  },
});

export const WareHouse = mongoose.model("warehouse", wareHouseSchema);
