import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend the Request object to include user
interface AuthRequest extends Request {
  user?: any;
}

// Middleware to protect routes
const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export { protect };
