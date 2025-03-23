import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CustomerContainer,
  InfoText,
} from "../../styles/CustomerStyles";
import { getCustomerById, Customer } from "../../api/customerAPI";
import { toast } from "react-toastify";

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!id) return;
        const data = await getCustomerById(id);
        setCustomer(data);
      } catch (error) {
        toast.error("Failed to load customer details.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
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
