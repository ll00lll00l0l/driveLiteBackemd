const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: String,
  amount: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: [
      'orderplaced',
      'orderconfirmed',
      'prepared',
      'startdelivery',
      'delivered',
      'hold',
      'return',
      'cancel',
    ],
    default: 'orderplaced',
  },
});

module.exports = mongoose.model('Order', OrderSchema);
