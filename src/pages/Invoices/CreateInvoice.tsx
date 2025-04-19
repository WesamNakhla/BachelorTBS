// src/pages/Invoices/CreateInvoice.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import {
  InvoiceContainer,
  Input,
  Select,
} from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";

// ✅ Interface for a customer object
interface Customer {
  id: string;
  name: string;
}

// ✅ Invoice form structure
interface InvoiceForm {
  customerId: string;
  invoiceNumber: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  items: string;
}

const CreateInvoice: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<InvoiceForm>({
    customerId: "",
    invoiceNumber: "",
    amount: "",
    status: "Pending",
    dueDate: "",
    items: "",
  });
  const [loading, setLoading] = useState(false);

  // 📦 Fetch customers from API on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          throw new Error("Invalid customers data.");
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
        toast.error("Failed to load customers.");
      }
    };

    fetchCustomers();
  }, []);

  // ✍️ Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.customerId || !formData.invoiceNumber || !formData.amount) {
      toast.warning("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/invoices", {
        ...formData,
        amount: parseFloat(formData.amount),
      });

      toast.success("✅ Invoice created successfully!");

      // Reset form after success
      setFormData({
        customerId: "",
        invoiceNumber: "",
        amount: "",
        status: "Pending",
        dueDate: "",
        items: "",
      });
    } catch (err) {
      console.error("Invoice creation failed:", err);
      toast.error("❌ Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create Invoice</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* 🔽 Customer Selector */}
        <Select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Select>

        {/* 🔢 Invoice Number */}
        <Input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={formData.invoiceNumber}
          onChange={handleChange}
          required
        />

        {/* 💰 Amount */}
        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        {/* 🏷️ Status Selector */}
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </Select>

        {/* 🗓️ Due Date */}
        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        {/* 📝 Items/Description */}
        <textarea
          name="items"
          placeholder="Invoice items or description"
          value={formData.items}
          onChange={handleChange}
          rows={4}
          required
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            resize: "vertical",
            backgroundColor: "#f9fafb",
          }}
        />

        {/* 🔘 Submit Button */}
        <Button type="submit" $variant="primary" $fullWidth>
          {loading ? "Creating..." : "Create Invoice"}
        </Button>
      </form>
    </InvoiceContainer>
  );
};

export default CreateInvoice;
