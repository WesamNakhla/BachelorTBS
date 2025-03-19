import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CustomerFormContainer,
  Form,
  Input,
  SubmitButton
} from "../../styles/CustomerStyles";

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    axios.post("/api/customers", formData).then(() => {
      alert("Customer Created!");
      navigate("/customers");
    });
  };

  return (
    <CustomerFormContainer>
      <h1>Create New Customer</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
        <Input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <Input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} />
        <Input name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
        <SubmitButton type="submit">Create Customer</SubmitButton>
      </Form>
    </CustomerFormContainer>
  );
};

export default CreateCustomer;
