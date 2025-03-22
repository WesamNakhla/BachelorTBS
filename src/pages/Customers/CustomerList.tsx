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
  DeleteButton,
  TopBar,
  SearchInput,
  AddButton,
  InfoText,
} from "../../styles/CustomerStyles";

// Define the Customer interface
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch customers from API when component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        const data = Array.isArray(response.data) ? response.data : [];
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err) {
        setError("Failed to load customers.");
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search input
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query)
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  // Delete a customer
  const handleDelete = async (customerId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/customers/${customerId}`);
      const updated = customers.filter((customer) => customer.id !== customerId);
      setCustomers(updated);
      setFilteredCustomers(updated);
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer.");
    }
  };

  return (
    <CustomerContainer>
      <TopBar>
        <h1>Customer List</h1>
        <AddButton onClick={() => navigate("/customers/create")}>+ New Customer</AddButton>
      </TopBar>

      <SearchInput
        type="text"
        placeholder="Search by name, email or phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Display loading state */}
      {loading && <p>Loading customers...</p>}

      {/* Display error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display customer table */}
      {!loading && !error && filteredCustomers.length > 0 ? (
        <>
          <CustomerTable>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
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
          <InfoText>{filteredCustomers.length} customer(s) found</InfoText>
        </>
      ) : (
        !loading && filteredCustomers.length === 0 && <p>No customers found.</p>
      )}
    </CustomerContainer>
  );
};

export default CustomerList;
