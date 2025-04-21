// Interface for an invoice object
export interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: {
    id: number;
    name: string;
    email: string;
    address: string;
    postCode: string;
    city: string;
    phone: string;
  };
  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate?: string;
}

// In-memory invoice list (mock data storage)
export const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    customer: {
      id: 101,
      name: "John Doe",
      email: "john@example.com",
      address: "Main Street 1",
      postCode: "1234",
      city: "Oslo",
      phone: "12345678"
    },
    products: "Storage services",
    quantity: 10,
    unit: "day",
    unitPrice: 100,
    total: 1000,
    tax: 25,
    grandTotal: 1250,
    status: "Paid",
    date: "2025-04-01",
    dueDate: "2025-04-10"
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    customer: {
      id: 102,
      name: "Sara Smith",
      email: "sara@example.com",
      address: "Parkveien 5",
      postCode: "5678",
      city: "Bergen",
      phone: "98765432"
    },
    products: "Transport services",
    quantity: 5,
    unit: "trip",
    unitPrice: 300,
    total: 1500,
    tax: 25,
    grandTotal: 1875,
    status: "Pending",
    date: "2025-04-15",
    dueDate: "2025-04-20"
  }
];
