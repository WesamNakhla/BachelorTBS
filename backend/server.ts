import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ... your routes and middleware
    // Middleware: Parse incoming JSON requests
    app.use(express.json());

    // Middleware: Parse cookies
    app.use(cookieParser());

    // Middleware: Enable CORS for frontend requests
    const allowedOrigins = ["http://localhost:5173"];
    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    // Route modules
    const routes = [
      { path: "/api/auth", module: "./routes/authRoutes" },
      { path: "/api/users", module: "./routes/userRoutes" },
      { path: "/api/customers", module: "./routes/customerRoutes" },
      { path: "/api/invoices", module: "./routes/invoiceRoutes" },
      { path: "/api/reports", module: "./routes/reportRoutes" },
      { path: "/api/security", module: "./routes/securityRoutes" },
      { path: "/api/notifications", module: "./routes/notificationRoutes" },
    ];

    // Load routes dynamically
    routes.forEach(({ path, module }) => {
      try {
        const routeModule = require(module).default;
        if (routeModule) {
          app.use(path, routeModule);
          console.log(`✅ Route loaded: ${path}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`❌ Error loading route ${path}:`, error.message);
        } else {
          console.error(`❌ Unknown error loading route ${path}:`, error);
        }
      }
    });

    // Root endpoint
    app.get("/", (req: Request, res: Response) => {
      res.json({ message: "✅ API is running" });
    });

    // Global error handler
    app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof Error) {
        console.error("❌ Internal server error:", err.message);
      } else {
        console.error("❌ Unknown error:", err);
      }
      res.status(500).json({ error: "Internal Server Error" });
    });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
