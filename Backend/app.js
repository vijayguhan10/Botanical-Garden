const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Router/initialrouter");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
const mongodbUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use("/botanicalgarden", router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
