import { Request, Response, NextFunction } from "express";
import Invoice from "../models/Invoice";
interface Invoice{
  invoiceNumber: string,
  customer: string,
  amount: number,
  status: string,
  date: string
}
// Function to get all invoices
export const getInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoices = await Invoice.find({}).lean().select("invoiceNumber customer amount status date");
    res.status(200).json({
      success: true,
      data: invoices
    });
  } catch (error) {
    next(error);
  }
};

// // Function to get a single invoice by ID
// export const getInvoiceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const invoice = await Invoice.findById(req.params.id);
//     if (!invoice) {
//       res.status(404).json({ message: "Invoice not found" });
//       return;
//     }
//     res.status(200).json(invoice);
//   } catch (error) {
//     next(error);
//   }
// };

// Function to create a new invoice
export const createInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("invoice endpoint is working");
  try {
    const { customer, amount, status, date } = req.body;
    const data = {
      invoiceNumber: GenerateRandomID(),
      customer: customer,
      amount: amount,
      status: status,
      date: date
    }
    const newInvoice = new Invoice(data);
    let savedInvoice = await newInvoice.save();
    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: savedInvoice
    });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: error
    });
    // next(error);
    
  }
};

// Function to update an existing invoice
export const updateInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { invoiceNumber, customer, amount, status, date  } = req.body;
  const updatedData = {
    customer: customer,
    amount: amount,
    status: status,
    date: date
  }
  try {
    const updatedInvoice = await Invoice.findOneAndUpdate({invoiceNumber}, updatedData , { new: true });
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
  const { invoiceNumber } = req.body;
  try {
    const deletedInvoice = await Invoice.findOneAndDelete({invoiceNumber});
    if (!deletedInvoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const GenerateRandomID =()=>{
  let random_number = Math.floor(10 + Math.random() * 101);
  console.log(random_number);
  return "#" + random_number;
}
