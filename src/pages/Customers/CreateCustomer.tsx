import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CustomerFormContainer,
  Form,
  Input,
  SubmitButton,
} from "../../styles/CustomerStyles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// Define customer input type
interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Yup schema for form validation
const customerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be digits only")
    .min(8, "Phone must be at least 8 digits")
    .required("Phone is required"),
  address: yup.string().required("Address is required"),
});

const CreateCustomer = () => {
  const navigate = useNavigate();

  // React Hook Form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerSchema),
  });

  // Handle form submission
  const onSubmit = async (data: CustomerFormData) => {
    try {
      await axios.post("/api/customers", data);
      toast.success("Customer created successfully!");
      reset(); // Clear the form
      navigate("/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error("Failed to create customer. Please try again.");
    }
  };

  return (
    <CustomerFormContainer>
      <h1>Create New Customer</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          placeholder="Full Name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <Input
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <Input
          {...register("phone")}
          placeholder="Phone"
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

        <Input
          {...register("address")}
          placeholder="Address"
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Customer"}
        </SubmitButton>
      </Form>
    </CustomerFormContainer>
  );
};

export default CreateCustomer;
