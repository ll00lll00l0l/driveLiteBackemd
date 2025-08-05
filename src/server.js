const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./db/conn");
const appRoutes = require("./routes");
const { uploadImage } = require("./controllers/mediaController.js");
const router = require("./routes");
const upload = require("./middleware/uploadMiddleware");
const { resizeImage } = require("./controllers/resizeImage.controller");

require("dotenv").config({ path: ".env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [`http://localhost:3000`, process.env.CLIENT_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/", appRoutes);
router.post("/api/upload", upload.single("image"), uploadImage);
router.get("/api/resize", resizeImage);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
