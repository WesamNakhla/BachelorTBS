import express, { Request, Response, NextFunction } from "express";
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController";

const router = express.Router();

// Route to get all invoices
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getInvoices(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to get a single invoice by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getInvoiceById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to create a new invoice
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createInvoice(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to update an existing invoice
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateInvoice(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to delete an invoice
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteInvoice(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
