import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ GET /api/customers/count - Return number of customers
router.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await prisma.customer.count();
    res.json({ count });
  } catch (error) {
    console.error("Failed to get customer count:", error);
    res.status(500).json({ message: "Failed to retrieve customer count." });
  }
});


export default router;
