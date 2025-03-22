import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CustomerContainer,
  InfoText,
} from "../../styles/CustomerStyles";

// Define the Customer interface
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch customer by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        toast.error("Failed to load customer details.");
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <p>Loading customer details...</p>;
  if (!customer) return <p>No customer data found.</p>;

  return (
    <CustomerContainer>
      <h1>Customer Details</h1>
      <InfoText><strong>ID:</strong> {customer.id}</InfoText>
      <InfoText><strong>Name:</strong> {customer.name}</InfoText>
      <InfoText><strong>Email:</strong> {customer.email}</InfoText>
      <InfoText><strong>Phone:</strong> {customer.phone}</InfoText>
      <InfoText><strong>Address:</strong> {customer.address}</InfoText>
    </CustomerContainer>
  );
};

export default CustomerDetails;
