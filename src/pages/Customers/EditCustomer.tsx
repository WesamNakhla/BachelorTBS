import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// Define form type
interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Define Yup validation schema
const customerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be digits only")
    .min(8, "Phone must be at least 8 digits")
    .required("Phone is required"),
  address: yup.string().required("Address is required"),
});

const EditCustomer = () => {
  const { id } = useParams(); // Get customer ID from route
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerSchema),
  });

  // Fetch existing customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        const data = response.data;

        // Fill form with customer data
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("address", data.address);
      } catch (error) {
        console.error("Error loading customer:", error);
        toast.error("Failed to load customer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, setValue]);

  // Submit updated data
  const onSubmit = async (data: CustomerFormData) => {
    try {
      await axios.put(`/api/customers/${id}`, data);
      toast.success("Customer updated successfully!");
      navigate("/customers");
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer.");
    }
  };

  return (
    <CustomerFormContainer>
      <h1>Edit Customer</h1>

      {loading ? (
        <p>Loading customer data...</p>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name")} placeholder="Full Name" />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

          <Input {...register("email")} placeholder="Email" />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <Input {...register("phone")} placeholder="Phone" />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

          <Input {...register("address")} placeholder="Address" />
          {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Customer"}
          </SubmitButton>
        </Form>
      )}
    </CustomerFormContainer>
  );
};

export default EditCustomer;
