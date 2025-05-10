import React from "react";
import { useParams } from "react-router-dom";
import { CustomerContainer } from "../../styles/CustomerStyles";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
const [customer, setCustomer] = React.useState<Customer | null>(null);

React.useEffect(() => {
  const fetchCustomer = async () => {
    const response = await fetch(`/api/customers/${id}`);
    const data = await response.json();
    setCustomer(data);
  };
  fetchCustomer();
}, [id]);


if (!customer) return <p>Loading customer details...</p>;


  return (
    <CustomerContainer>
      <h2>Customer Details</h2>
      <p><strong>ID:</strong> {customer.id}</p>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
    </CustomerContainer>
  );
};

export default CustomerDetails;
