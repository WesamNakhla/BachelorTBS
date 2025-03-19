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
  const customer: Customer | null = null; // استبدلها بمنطق جلب البيانات الحقيقي

  if (!customer) return <p>Loading...</p>;

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
