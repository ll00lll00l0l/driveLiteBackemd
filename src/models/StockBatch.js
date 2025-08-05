const mongoose = require("mongoose");

const StockBatchSchema = new  mongoose.Schema({
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
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      rate: {
        type: mongoose.Types.Decimal128,
        required: true,
      },
    total_amount:{
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
      timestamp: {
    type: Date,
    default: Date.now,
  },
  invoice_id: {
    type: String,
    required: true,
  }
})
module.exports = mongoose.model("StockBatch", StockBatchSchema);
