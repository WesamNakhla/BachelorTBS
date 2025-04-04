import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
require("dotenv").config();
// Generate JWT Token
const generateToken = (email: string, _id: string): string => {
  return jwt.sign({ 
    email: email,
    _id 
  },
    process.env.JWT_SECRET as string,
    {
    expiresIn: "30d",
    }
  );
};

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return 
    }

    const { firstName, lastName, email, dateOfBirth, password } = req.body;
    console.log(dateOfBirth)

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return 
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      password: hashedPassword
    }
    // Create new user
    const user = await User.create(userData);

    if (!user) {
      res.status(400).json({ message: "Invalid user data" });
      return 
    }

    // Send response
    res.status(201).json({
      sucess: true,
      message: "You have successfully create your account"
    });
    return 
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
       return;
    }

    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });

    //Check password
    if (!user) {
      res.status(401).json({ message: "Invalid Email" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(401).json({ message: "Invalid password" });
      return;
    }
 

    // Send response
    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      token: generateToken(user.email, user._id.toString()),
    });
    return 
  } catch (error) {
    next(error);
  }
};
