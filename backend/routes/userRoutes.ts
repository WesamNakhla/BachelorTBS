import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully fetched users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/", (req: Request, res: Response): void => {
  // Placeholder response (replace with DB logic later)
  res.status(200).json([
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
  ]);
});

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/", (req: Request, res: Response): void => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required." });
    return;
  }

  // Simulate new user creation (replace with DB logic)
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
  };

  res.status(201).json(newUser);
});

export default router;
