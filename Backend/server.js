import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.config.js";
// import authRoutes from "./src/routes/authRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.middlewares.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 BusYatra API is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
    },
  });
});

// Error Handler (always at the end)
app.use(errorHandler);

// Database + Server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
