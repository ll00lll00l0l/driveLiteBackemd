const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 15,
  },
  base_amount: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);
