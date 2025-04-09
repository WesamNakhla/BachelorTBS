import { Request, Response, NextFunction } from "express";
import { users } from "../models/User"; // Import 'users' mock database
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",
    };
    users.push(newUser);

    // Send response
    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.email),
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = users.find((user) => user.email === email);

    // Check password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Send response
    return res.json({
      name: user.name,
      email: user.email,
      token: generateToken(user.email),
    });
  } catch (error) {
    next(error);
  }
};
