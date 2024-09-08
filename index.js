import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
