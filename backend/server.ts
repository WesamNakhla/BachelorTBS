import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import fs from "fs";

// Swagger imports
import { swaggerUi, swaggerSpec } from "./docs/swagger"; // ✅ Make sure this file exists

// Load environment variables from .env
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS configuration (adjust origins if needed)
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("📚 Swagger UI available at /api-docs");

// Dynamically load route files from backend/routes
const loadRoutes = async (routesPath: string) => {
  const routeFiles = fs.readdirSync(routesPath);

  for (const file of routeFiles) {
    const fullPath = path.join(routesPath, file);

    // Only load TypeScript or JavaScript files
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

// Load routes from backend/routes directory
const routesDir = path.join(__dirname, "routes");
if (fs.existsSync(routesDir)) {
  loadRoutes(routesDir);
} else {
  console.warn("⚠️ 'routes' directory not found.");
}

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ API is running" });
});

// Global error handler middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Global Error:", err instanceof Error ? err.message : err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
