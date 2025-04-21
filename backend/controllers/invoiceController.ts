import { Request, Response, NextFunction } from "express";
import { invoices } from "../models/Invoice";
import { getInventoryByCustomerId } from "../models/Inventory";

// Get all invoices
export const getInvoices = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// Get invoice by ID with extended details
export const getInvoiceById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const invoiceId = parseInt(req.params.id);
    const invoice = invoices.find(inv => inv.id === invoiceId);

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    const inventoryItems = getInventoryByCustomerId(invoice.customer.id);

    const response = {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      company: "Terminal og Bud Service AS",
      customer: {
        name: invoice.customer.name,
        email: invoice.customer.email,
        address: invoice.customer.address,
        postCode: invoice.customer.postCode,
        city: invoice.customer.city,
        phone: invoice.customer.phone,
      },
      products: invoice.products,
      quantity: invoice.quantity,
      unit: invoice.unit,
      unitPrice: invoice.unitPrice,
      total: invoice.total,
      tax: invoice.tax,
      grandTotal: invoice.grandTotal,
      status: invoice.status,
      date: invoice.date,
      dueDate: invoice.dueDate,
      inventoryItems: inventoryItems.map(item => ({
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
        customer: item.customerName,
        goods: item.goods,
        type: item.type,
        quantity: item.quantity,
        weight: item.weight,
      })),
      bankInfo: {
        accountNumber: "1234 56 789101",
        kidNumber: "123XXX-01",
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Create a new invoice
export const createInvoice = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const newInvoice = { ...req.body, id: Date.now() };
    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
  } catch (error) {
    next(error);
  }
};

// Update existing invoice
export const updateInvoice = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const invoiceId = parseInt(req.params.id);
    const index = invoices.findIndex(inv => inv.id === invoiceId);

    if (index === -1) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    invoices[index] = { ...invoices[index], ...req.body };
    res.status(200).json(invoices[index]);
  } catch (error) {
    next(error);
  }
};

// Delete an invoice
export const deleteInvoice = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const invoiceId = parseInt(req.params.id);
    const index = invoices.findIndex(inv => inv.id === invoiceId);

    if (index === -1) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    invoices.splice(index, 1);
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    next(error);
  }
};
