// src/pages/Invoices/InvoiceModal.tsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ModalOverlay,
  ModalContent,
  Input,
  Select,
} from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";

interface Customer {
  id: string;
  name: string;
  email: string;
  orgNumber: string;
  postCode: string;
  address: string;
  city: string;
}

interface InvoiceModalProps {
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ onClose }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    products: "",
    quantity: 1,
    unit: "stk",
    unitPrice: 0,
    total: 0,
    tax: 0,
    grandTotal: 0,
    email: "",
    orgNumber: "",
    postCode: "",
    address: "",
    city: "",
  });

  // Load customers
  const fetchCustomers = useCallback(async () => {
    try {
      const res = await axios.get("/api/customers");
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleCustomerSelect = (id: string) => {
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      setInvoiceData((prev) => ({
        ...prev,
        email: customer.email,
        orgNumber: customer.orgNumber,
        postCode: customer.postCode,
        address: customer.address,
        city: customer.city,
      }));
      setSelectedCustomer(id);
    }
  };

  // Update and calculate totals dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "quantity" || name === "unitPrice" ? Number(value) : value;

    setInvoiceData((prev) => {
      const updated = {
        ...prev,
        [name]: parsedValue,
      };

      const total = Number(updated.quantity) * Number(updated.unitPrice);
      const tax = +(total * 0.25).toFixed(2); // MVA = 25%
      const grandTotal = +(total + tax).toFixed(2);

      return {
        ...updated,
        total,
        tax,
        grandTotal,
      };
    });
  };

  const handleAddInvoice = async () => {
    if (!selectedCustomer || !invoiceData.invoiceNumber) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      await axios.post("/api/invoices", {
        customerId: selectedCustomer,
        ...invoiceData,
      });

      alert("Invoice created successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to save invoice", err);
      alert("Failed to create invoice.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent style={{ maxWidth: "680px" }}>
        <h2 style={{ marginBottom: "20px" }}>Create Invoice</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
        )}

        {loading ? (
          <p>Loading customers...</p>
        ) : (
          <Select value={selectedCustomer} onChange={(e) => handleCustomerSelect(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
        )}

        <Input name="invoiceNumber" placeholder="Invoice Number" value={invoiceData.invoiceNumber} onChange={handleChange} />
        <Input name="products" placeholder="Products" value={invoiceData.products} onChange={handleChange} />
        <Input name="quantity" type="number" placeholder="Quantity" value={invoiceData.quantity} onChange={handleChange} />
        <Input name="unit" placeholder="Unit (e.g. stk, m²)" value={invoiceData.unit} onChange={handleChange} />
        <Input name="unitPrice" type="number" placeholder="Unit Price (kr)" value={invoiceData.unitPrice} onChange={handleChange} />

        {/* Calculated values */}
        <Input value={`Total: ${invoiceData.total.toFixed(2)} kr`} readOnly />
        <Input value={`MVA (25%): ${invoiceData.tax.toFixed(2)} kr`} readOnly />
        <Input value={`Grand Total: ${invoiceData.grandTotal.toFixed(2)} kr`} readOnly />

        {/* Readonly customer details */}
        <Input value={invoiceData.email} readOnly />
        <Input value={invoiceData.orgNumber} readOnly />
        <Input value={invoiceData.postCode} readOnly />
        <Input value={invoiceData.address} readOnly />
        <Input value={invoiceData.city} readOnly />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <Button onClick={onClose} style={{ backgroundColor: "#ccc", color: "#000" }}>
            Cancel
          </Button>
          <Button onClick={handleAddInvoice}>Save Invoice</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InvoiceModal;
