const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
      console.log("Auth service running on port 5000");
    });

  } catch (err) {
    console.error("MongoDB ERROR:", err.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Auth Service Running");
});