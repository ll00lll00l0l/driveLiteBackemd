const { Server } = require("socket.io");
const Order = require("./models/Order"); // make sure this path is correct

let io = null;

function initSocket(server) {
  io = new Server(server, {
    cors: {
 origin: [
    "http://localhost:3000",
    "https://drivelitefe.vercel.app",
    process.env.CLIENT_URL
  ],      transports: ["websocket", "polling"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("update_order_status", async ({ orderId, status }) => {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );

        if (!updatedOrder) {
          console.warn("⚠️ Order not found:", orderId);
          return;
        }

        io.emit("order_status_updated", updatedOrder);
        console.log(`✅ Order ${orderId} updated to "${status}"`);
      } catch (err) {
        console.error("❌ Failed to update order status:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  console.log("✅ Socket.io server initialized and listening for connections.");
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
  initSocket,
  getIO,
};
