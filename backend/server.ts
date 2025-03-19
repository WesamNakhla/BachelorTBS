import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // Allow frontend requests
app.use(cookieParser()); // Parse cookies

// Import routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import customerRoutes from "./routes/customerRoutes";
import invoiceRoutes from "./routes/invoiceRoutes";
import reportRoutes from "./routes/reportRoutes";
import securityRoutes from "./routes/securityRoutes";
import notificationRoutes from "./routes/notificationRoutes";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/notifications", notificationRoutes);

// Root API endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
