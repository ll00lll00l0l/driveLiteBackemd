const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db/conn");
const appRoutes = require("./routes");
const http = require('http');

dotenv.config({ path: ".env" });

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

connectDB();

app.use(cors({
  // origin: "*",
  origin: [
    "http://localhost:3000",
    "https://drivelitefe.vercel.app",
    process.env.CLIENT_URL
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
const { initSocket } = require("./socket.js");
initSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const orderRoutes = require("./routes/orderRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
app.use("/api", orderRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/supplier", require("./routes/supplierRoutes"));
app.use("/", appRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));




// ✅ Start the Server
server.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
