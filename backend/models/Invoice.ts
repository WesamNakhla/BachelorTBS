import mongoose, { Schema, Document } from "mongoose";

// Define an interface representing an invoice document
interface IInvoice extends Document {
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: string;
  date: Date;
}

// Create a schema corresponding to the document interface
const InvoiceSchema: Schema = new Schema({
  invoiceNumber: { type: String, required: true },
  customer: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create and export the model
const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSchema);
export default Invoice;
