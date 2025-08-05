const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { getIO } = require("../socket.js");

router.post("/orders", async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      timestamp: new Date(),
    });

    const saved = await order.save();
        const totalOrders = await Order.countDocuments();
        
        const comformedOrders = await Order.countDocuments({ status: "orderconfirmed" });
        const preparedOrders = await Order.countDocuments({ status: "prepared" });
        const deliveredOrders = await Order.countDocuments({ status: "delivered" });
        const holdOrders = await Order.countDocuments({ status: "hold" });
        const returnOrders = await Order.countDocuments({ status: "return" });
        const cancelOrders = await Order.countDocuments({ status: "cancel" });

    const io = getIO();
    io.emit("new_order",{ "order":saved , totalOrders,comformedOrders,preparedOrders,deliveredOrders,holdOrders,returnOrders,cancelOrders});
    res.json({"order":saved , totalOrders,comformedOrders,preparedOrders,deliveredOrders,holdOrders,returnOrders,cancelOrders});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

module.exports = router;
