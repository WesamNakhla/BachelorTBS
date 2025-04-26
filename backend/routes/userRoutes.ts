import express from "express";
import type { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

const router = express.Router();

// Get all users
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
});

// Get a user by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    next(error);
  }
});

// Update a user by ID
router.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
});

// Delete a user by ID
router.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(204).end(); // No Content
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
});

export default router;
