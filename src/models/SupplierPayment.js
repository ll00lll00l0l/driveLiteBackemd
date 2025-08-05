const mongoose = require("mongoose");

const supplierPaymentSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
    unique: true,
    required: true,
  },
  invoice_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("SupplierPayment", supplierPaymentSchema);
