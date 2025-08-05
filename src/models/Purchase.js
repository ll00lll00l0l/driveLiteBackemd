// models/Purchase.js
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  description: String,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  purchase_date: {
    type: Date,
    required: true,
  },
  invoice_id: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
}, { timestamps: true });

purchaseSchema.virtual("totalCost").get(function () {
  return parseFloat(this.quantity) * parseFloat(this.rate);
});

module.exports = mongoose.model("Purchase", purchaseSchema);
