const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const connectDB = require('./db/conn');
const appRoutes = require('./routes');

require("dotenv").config({ path: ".env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use('/', appRoutes);


connectDB();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});