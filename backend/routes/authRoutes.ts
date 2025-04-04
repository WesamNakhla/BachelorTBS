import express, { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../controllers/Auth/auth";
import { body } from "express-validator";


const router = express.Router();

// Validation middleware
const validateUserRegistration = [
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name  is required"),
  body("dateOfBirth").notEmpty().withMessage("date of birth is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const validateUserLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Register route
router.post("/register", validateUserRegistration, registerUser);

// Login route
router.post("/login", validateUserLogin, loginUser);

// Test route
router.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "Test route is working!" });
});

export default router;
