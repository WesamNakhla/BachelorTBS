import React, { useState } from "react";
import {
  InvoiceFormContainer,
  Form,
  Input,
  SubmitButton,
} from "../../styles/InvoiceStyles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customer: "",
    amount: "",
    status: "Pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/invoices", formData).then(() => {
      alert("Invoice Created!");
      navigate("/invoices");
    });
  };

  return (
    <InvoiceFormContainer>
      <h1>Create New Invoice</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="invoiceNumber" placeholder="Invoice #" onChange={handleChange} required />
        <Input name="customer" placeholder="Customer Name" onChange={handleChange} required />
        <Input name="amount" type="number" placeholder="Amount $" onChange={handleChange} required />
        <SubmitButton type="submit">Create Invoice</SubmitButton>
      </Form>
    </InvoiceFormContainer>
  );
};

export default CreateInvoice;
