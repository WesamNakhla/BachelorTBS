import { useState, useEffect, useCallback } from "react";
import {
  ModalOverlay,
  ModalContent,
  Input,
  Select,
  Button,
} from "../../styles/InvoiceStyles";
import axios from "axios";

// Define Customer interface
interface Customer {
  id: string;
  name: string;
  email: string;
  orgNumber: string;
  postCode: string;
  address: string;
  city: string;
}

const InvoiceModal = ({ onClose }: { onClose: () => void }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState({
    email: "",
    orgNumber: "",
    postCode: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers from API
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/customers"); // تأكد من صحة الرابط

      console.log("Customers API Response:", response.data); // Debugging

      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        console.error("Error: API response is not an array", response.data);
        setCustomers([]);
        setError("Invalid data format received from server.");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
      setError("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Handle customer selection
  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setInvoiceData({
        email: customer.email,
        orgNumber: customer.orgNumber,
        postCode: customer.postCode,
        address: customer.address,
        city: customer.city,
      });
      setSelectedCustomer(customerId);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Ny Faktura</h2>

        {/* Show error message if there's an issue loading customers */}
        {error && (
          <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
            {error}
            <br />
            <Button onClick={fetchCustomers} style={{ backgroundColor: "#d9534f", marginTop: "5px" }}>
              Retry
            </Button>
          </div>
        )}

        {/* Customer Selection */}
        {loading ? (
          <p>Loading customers...</p>
        ) : (
          <Select value={selectedCustomer} onChange={(e) => handleCustomerSelect(e.target.value)}>
            <option value="">Velg kunde</option>
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))
            ) : (
              <option disabled>No customers available</option>
            )}
          </Select>
        )}

        {/* Customer Details Fields */}
        <Input type="email" placeholder="E-post" value={invoiceData.email} readOnly />
        <Input type="text" placeholder="Org nr" value={invoiceData.orgNumber} readOnly />
        <Input type="text" placeholder="Postnr" value={invoiceData.postCode} readOnly />
        <Input type="text" placeholder="Adresse" value={invoiceData.address} readOnly />
        <Input type="text" placeholder="Sted" value={invoiceData.city} readOnly />

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Button onClick={onClose} style={{ backgroundColor: "#ccc" }}>
            Cancel
          </Button>
          <Button onClick={() => alert("Invoice added!")}>Add</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InvoiceModal;
