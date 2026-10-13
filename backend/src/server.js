import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "2Gether backend is running",
  });
});

app.use("/api/auth", authRoutes);

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be set to at least 32 characters in backend/.env.");
  }

  await connectDB();
  app.listen(port, () => {
    console.log(`2Gether backend is running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error(`2Gether backend failed to start: ${error.message}`);
  process.exitCode = 1;
});
