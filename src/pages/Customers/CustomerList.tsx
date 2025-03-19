import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CustomerContainer,
  CustomerTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  ViewButton,
  EditButton,
  DeleteButton
} from "../../styles/CustomerStyles";

// Define the Customer interface
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CustomerList = () => {
  // State to store customers
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch customers from API when component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to load customers.");
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Function to delete a customer
  const handleDelete = async (customerId: number) => {
    try {
      await axios.delete(`/api/customers/${customerId}`);
      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer.");
    }
  };

  return (
    <CustomerContainer>
      <h1>Customer List</h1>

      {/* Display loading message */}
      {loading && <p>Loading customers...</p>}

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display table only if customers exist */}
      {!loading && !error && customers.length > 0 ? (
        <CustomerTable>
          <TableHead>
            <TableRow>
              <TableHeader>Customer ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableData>{customer.id}</TableData>
                <TableData>{customer.name}</TableData>
                <TableData>{customer.email}</TableData>
                <TableData>{customer.phone}</TableData>
                <TableData>
                  <ActionButtons>
                    <ViewButton onClick={() => navigate(`/customers/${customer.id}`)}>View</ViewButton>
                    <EditButton onClick={() => navigate(`/customers/edit/${customer.id}`)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(customer.id)}>Delete</DeleteButton>
                  </ActionButtons>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </CustomerTable>
      ) : (
        !loading && <p>No customers found.</p>
      )}
    </CustomerContainer>
  );
};

export default CustomerList;
