import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalContent,
  Input,
  Select,
} from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";

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

const InvoiceModal = ({ onClose }: InvoiceModalProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    amount: "",
    email: "",
    orgNumber: "",
    postCode: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/customers");
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        setError("Invalid data format received from server.");
      }
    } catch (err) {
      setError("Failed to load customers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setInvoiceData((prev) => ({
        ...prev,
        email: customer.email,
        orgNumber: customer.orgNumber,
        postCode: customer.postCode,
        address: customer.address,
        city: customer.city,
      }));
      setSelectedCustomer(customerId);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInvoice = async () => {
    if (!selectedCustomer || !invoiceData.invoiceNumber || !invoiceData.amount) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("/api/invoices", {
        customerId: selectedCustomer,
        invoiceNumber: invoiceData.invoiceNumber,
        amount: parseFloat(invoiceData.amount),
      });
      toast.success("Invoice created successfully!");
      onClose();
    } catch {
      toast.error("Failed to create invoice.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h3>Create New Invoice</h3>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalContent>
          {error && (
            <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
              {error}
              <Button onClick={fetchCustomers} style={{ marginTop: "10px" }}>
                Retry
              </Button>
            </div>
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

          <Input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            value={invoiceData.amount}
            onChange={handleChange}
          />

          <Input type="email" placeholder="Email" value={invoiceData.email} readOnly />
          <Input type="text" placeholder="Organization Number" value={invoiceData.orgNumber} readOnly />
          <Input type="text" placeholder="Post Code" value={invoiceData.postCode} readOnly />
          <Input type="text" placeholder="Address" value={invoiceData.address} readOnly />
          <Input type="text" placeholder="City" value={invoiceData.city} readOnly />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
            <Button style={{ backgroundColor: "#ccc", color: "#333" }} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddInvoice}>Add Invoice</Button>
          </div>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InvoiceModal;
