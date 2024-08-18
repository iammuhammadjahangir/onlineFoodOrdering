const mongoose = require("mongoose");

const tradeFormSchema = mongoose.Schema({
    name: {
        type: String,

    },

    weight: {
        type: Number,
        default: 0,

    },
    rate: {
        type: Number,
        default: 0

    },

    type: {
        type: String,
    },

    cash: {
        type: Number,
        default: 0

    },
    desc: {
        type: String,

    },
    reportID: {
        type: String,
        require: true
    },
    sellerName: {
        type: String,

    },
    packingCharges: {
        type: Number,
        default: 0
    },
    deleteStatus: {
        type: Boolean,
        default: false

    }


}, {
    timestamps: true
});
const tradeFormModel = mongoose.model("tradeFormData", tradeFormSchema, "tradeFormData");


module.exports = tradeFormModel;