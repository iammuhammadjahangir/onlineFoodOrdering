import mongoose from "mongoose";

const salesIncrementSchema = new mongoose.Schema({
  id: { type: String },
  seq: { type: Number },
});

const SaleInvoiceIncrement = mongoose.model(
  "saleInvoiceIncrement",
  salesIncrementSchema
);
