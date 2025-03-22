import { Request, Response, NextFunction } from "express";
import Invoice from "../models/Invoice";

// Function to get all invoices
export const getInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// Function to get a single invoice by ID
export const getInvoiceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }
    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

// Function to create a new invoice
export const createInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { invoiceNumber, customer, amount, status, date } = req.body;
    const newInvoice = new Invoice({ invoiceNumber, customer, amount, status, date });
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    next(error);
  }
};

// Function to update an existing invoice
export const updateInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    next(error);
  }
};

// Function to delete an invoice
export const deleteInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    next(error);
  }
};
