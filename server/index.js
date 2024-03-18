import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();

mongoose
  .connect("mongodb://localhost:27017/enteBuddy")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in connecting database : ", err));

app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log("server started at port 3000"));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
