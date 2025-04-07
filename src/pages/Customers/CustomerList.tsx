import { useEffect, useState } from "react";
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
import { getAllCustomers, deleteCustomer, Customer } from "../../api/customerAPI";
import { toast } from "react-toastify";

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load customers on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();

        if (Array.isArray(data)) {
          setCustomers(data);
          setFilteredCustomers(data);
        } else {
          setCustomers([]);
          setFilteredCustomers([]);
          toast.error("Invalid customer data format from server.");
        }
      } catch (err) {
        console.error("Error loading customers:", err);
        toast.error("Error loading customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers on search
  useEffect(() => {
    const filtered = customers.filter((c) =>
      [c.name, c.email, c.phone].some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  // Delete customer
  const handleDelete = async (id: string | number) => {
    const confirm = window.confirm("Are you sure you want to delete this customer?");
    if (!confirm) return;

    try {
      await deleteCustomer(id);
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      setFilteredCustomers(updated);
      toast.success("Customer deleted successfully.");
    } catch (err) {
      console.error("Failed to delete customer:", err);
      toast.error("Failed to delete customer.");
    }
  };

  return (
    <CustomerContainer>
      {/* Page Title & Add Button */}
      <TopBar>
        <h1>Customer List</h1>
        <AddButton onClick={() => navigate("/customers/create")}>
          + New Customer
        </AddButton>
      </TopBar>

      {/* Search Field */}
      <SearchInput
        placeholder="Search by name, email, or phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Customer Table */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredCustomers.length > 0 ? (
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
                      <ViewButton onClick={() => navigate(`/customers/${customer.id}`)}>
                        View
                      </ViewButton>
                      <EditButton onClick={() => navigate(`/customers/edit/${customer.id}`)}>
                        Edit
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(customer.id)}>
                        Delete
                      </DeleteButton>
                    </ActionButtons>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </CustomerTable>
          <InfoText>{filteredCustomers.length} customer(s) found</InfoText>
        </>
      ) : (
        <p>No customers found.</p>
      )}
    </CustomerContainer>
  );
};

export default CustomerList;
