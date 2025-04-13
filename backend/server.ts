import express, { Request, Response, } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
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

// Safe route loader with error isolation
const loadRoutes = async (routesPath: string) => {
  const routeFiles = fs.readdirSync(routesPath);

  for (const file of routeFiles) {
    const fullPath = path.join(routesPath, file);

    // Only .ts or .js files
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

    try {
      const routeModule = await import(fullPath);
      if (routeModule.default && typeof routeModule.default === "function") {
        const routePath = `/api/${path.basename(file, path.extname(file))}`;
        app.use(routePath, routeModule.default);
        console.log(`✅ Route loaded: ${routePath}`);
      } else {
        console.warn(`⚠️ Skipped file (no default export): ${file}`);
      }
    } catch (err) {
      console.error(`❌ Error loading route ${file}:`, err);
    }
  }
};

// Load all routes from the "routes" directory
const routesDir = path.join(__dirname, "routes");
if (fs.existsSync(routesDir)) {
  loadRoutes(routesDir);
} else {
  console.warn("⚠️ No 'routes' directory found to load.");
}

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
