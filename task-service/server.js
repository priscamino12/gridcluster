const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasksRoutes");

require("dotenv").config();
const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

app.use("/api/tasks", taskRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => {
  console.error("MongoDB ERROR:", err.message);
});

app.get("/", (req, res) => {
  res.send("Task Service Running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Task service running on port ${PORT}`);
});