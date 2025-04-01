import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bachelor-db";

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

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

// Dynamically load all routes from the "routes" folder
const loadRoutes = (routesPath: string) => {
  fs.readdirSync(routesPath).forEach((file) => {
    const fullPath = path.join(routesPath, file);

    if (file.endsWith(".ts") || file.endsWith(".js")) {
      import(fullPath)
        .then((routeModule) => {
          if (routeModule.default) {
            const routePath = `/api/${path.basename(file, path.extname(file))}`;
            app.use(routePath, routeModule.default);
            console.log(`✅ Route loaded: ${routePath}`);
          } else {
            console.warn(`⚠️ No default export found in: ${fullPath}`);
          }
        })
        .catch((error) => {
          console.error(`❌ Failed to load route at ${fullPath}:`, error);
        });
    }
  });
};

// Load all routes from the "routes" directory
loadRoutes(path.join(__dirname, "routes"));

// Root API test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ API is running" });
});

// Global error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Unhandled error:", err instanceof Error ? err.message : err);
  res.status(500).json({ error: "Internal Server Error" });
  next(err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
