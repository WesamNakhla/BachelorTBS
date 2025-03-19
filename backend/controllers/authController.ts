import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
    res.cookie("token", token, { httpOnly: true });
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
