import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import connectDB from "./config/db";

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ Enable CORS for frontend requests
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Function to dynamically load route modules
const loadRoutes = (routesPath: string) => {
  fs.readdirSync(routesPath).forEach((file) => {
    // Construct full path of the route file
    const fullPath = path.join(routesPath, file);

    // Check if the file is a TypeScript or JavaScript file
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      // Import the route module
      import(fullPath)
        .then((routeModule) => {
          // Use the default export if available
          if (routeModule.default) {
            // Construct the route path based on the file name
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

// ✅ Load routes from the 'routes' directory
loadRoutes(path.join(__dirname, "routes"));

// ✅ Root API endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ API is running" });
});

// ✅ Global error handler with proper use of `next`
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Unhandled error:", err instanceof Error ? err.message : err);

  // Send error response
  res.status(500).json({ error: "Internal Server Error" });

  // Optional: Forward to the next error handler if any (best practice for flexibility)
  next(err);
});

// ✅ Start server after successful DB connection
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
};

startServer();
