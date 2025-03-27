import { useState, useEffect } from "react";
import axios from "axios";
import {
  InvoiceContainer,
  Input,
  Select,
} from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";

// Define customer type
interface Customer {
  id: string;
  name: string;
  email: string;
  orgNumber: string;
  postCode: string;
  address: string;
  city: string;
}

interface InvoiceForm {
  customerId: string;
  dueDate: string;
  items: string;
}

const CreateInvoice = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<InvoiceForm>({
    customerId: "",
    dueDate: "",
    items: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customers");
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/invoices", formData);
      toast.success("✅ Invoice created successfully!");
      setFormData({
        customerId: "",
        dueDate: "",
        items: "",
      });
    } catch (err) {
      console.error(err);
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
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {/* Customer dropdown */}
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

        {/* Due date */}
        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        {/* Items description */}
        <textarea
          name="items"
          placeholder="Invoice items/description"
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

        {/* Submit button */}
        <Button $variant="primary" type="submit" $fullWidth>
          {loading ? "Creating..." : "Create Invoice"}
        </Button>
      </form>
    </InvoiceContainer>
  );
};

export default CreateInvoice;
