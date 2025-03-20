import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("❌ Database connection failed:", err.message);
  process.exit(1); // Exit the server if DB connection fails
});

// Initialize Express app
const app = express();

// ✅ Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser()); // Parse cookies

// ✅ Import routes with error handling
let authRoutes, userRoutes, customerRoutes, invoiceRoutes, reportRoutes, securityRoutes, notificationRoutes;

try {
  authRoutes = require("./routes/authRoutes").default;
  userRoutes = require("./routes/userRoutes").default;
  customerRoutes = require("./routes/customerRoutes").default;
  invoiceRoutes = require("./routes/invoiceRoutes").default;
  reportRoutes = require("./routes/reportRoutes").default;
  securityRoutes = require("./routes/securityRoutes").default;
  notificationRoutes = require("./routes/notificationRoutes").default;
} catch (err) {
  console.error("❌ Error importing routes:", err.message);
}

// ✅ Use routes only if they exist
if (authRoutes) app.use("/api/auth", authRoutes);
if (userRoutes) app.use("/api/users", userRoutes);
if (customerRoutes) app.use("/api/customers", customerRoutes);
if (invoiceRoutes) app.use("/api/invoices", invoiceRoutes);
if (reportRoutes) app.use("/api/reports", reportRoutes);
if (securityRoutes) app.use("/api/security", securityRoutes);
if (notificationRoutes) app.use("/api/notifications", notificationRoutes);

// ✅ Root API endpoint
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
