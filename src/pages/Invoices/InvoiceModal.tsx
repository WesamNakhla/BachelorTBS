import { useState, useEffect, useCallback, useMemo } from "react";
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

  // Fetch customers from API
  const fetchCustomers = useCallback(() => {
    axios
      .get("/api/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Memoized function to handle customer selection
  const handleCustomerSelect = useCallback(
    (customerId: string) => {
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
    },
    [customers]
  );

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Ny Faktura</h2>

        {/* Customer Selection */}
        <Select value={selectedCustomer} onChange={(e) => handleCustomerSelect(e.target.value)}>
          <option value="">Velg kunde</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Select>

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
