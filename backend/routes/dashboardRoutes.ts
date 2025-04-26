import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ GET /api/dashboard/stats - Return dashboard statistics
router.get("/stats", async (req: Request, res: Response) => {
  try {
    // Get total number of customers
    const totalCustomers = await prisma.customer.count();

    // Get total number of invoices
    const totalInvoices = await prisma.invoice.count();

    // Get total revenue (only paid invoices)
    const paidInvoices = await prisma.invoice.findMany({
      where: { status: "Paid" },
      select: { amount: true },
    });
    const totalRevenue = paidInvoices.reduce((sum: number, inv: { amount: number }) => sum + inv.amount, 0);

    // Send all stats
    res.json({
      totalCustomers,
      totalInvoices,
      totalRevenue,
    });
  } catch (error) {
    console.error("❌ Failed to fetch dashboard stats:", error);
    res.status(500).json({ message: "Failed to load dashboard statistics" });
  }
});

export default router;
