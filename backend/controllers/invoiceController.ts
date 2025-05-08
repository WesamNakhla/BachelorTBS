import { Request, Response, NextFunction } from "express";
import Invoice  from "../models/Invoice";
import { Customer } from "../models/Customer";
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
    const invoices = await Invoice.find({}).populate({ path: "customer", select: "customer -_id" }).exec();
    const invoices_data = invoices.filter(data=> {
      return data.customer != null
    })
    console.log(invoices_data);
    res.status(200).json({
      success: true,
      data: invoices_data
    });
  } catch (error) {
    next(error);
  }
};


// Function to create a new invoice
export const createInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("invoice endpoint is working");
  try {
    const { customer, status, date } = req.body;
    //get the id of the customer with the help of the customer name
    let customer_name = await Customer.findOne({ customer: customer }).select("_id").exec();
    if(!customer_name){
      res.status(404).json({
        success: false,
        message: "No customer with the name you entered"
    })
    }

    const data = {
      invoiceNumber: GenerateRandomID(),
      customer: customer_name._id,
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
