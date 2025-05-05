import express, { Request, Response, } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import invoiceRoutes from "./routes/invoiceRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import customerRoutes from "./routes/customerRoutes";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL as string;

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Enable CORS for frontend (adjust origin as needed)
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api/v1", authRoutes);
app.use("/api/v1", invoiceRoutes);
app.use("/api/v1", inventoryRoutes);
app.use("/api/v1", customerRoutes);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ API is running" });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, next) => {
  res.send("Hello");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
