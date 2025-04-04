import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db";
import AuthRoutes from "./routes/authRoutes";


// Load environment variables
dotenv.config();

//  Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

//  Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/v1", AuthRoutes);

// Enable CORS for frontend requests
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Root API endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ API is running" });
});

//  Global error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(" Unhandled error:", err instanceof Error ? err.message : err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server after successful DB connection
const startServer = async () => {
  try {
    await connectDB();
    console.log(" Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
};

startServer();
