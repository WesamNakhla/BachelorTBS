import express, { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { body } from "express-validator";

const router = express.Router();

// Validation middleware
const validateUserRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const validateUserLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Register route
router.post("/register", validateUserRegistration, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await registerUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Login route
router.post("/login", validateUserLogin, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await loginUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Test route
router.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "Test route is working!" });
});

export default router;
