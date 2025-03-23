import { useNavigate } from "react-router-dom";
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
import { createCustomer } from "../../api/customerAPI";

// Define the shape of form data
interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Define Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numeric")
    .min(8, "Phone must be at least 8 digits")
    .required("Phone is required"),
  address: yup.string().required("Address is required"),
});

const CreateCustomer = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerFormData>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: CustomerFormData) => {
    try {
      await createCustomer(data);
      toast.success("Customer created successfully!");
      reset(); // Clear form after success
      navigate("/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error("Failed to create customer. Please try again.");
    }
  };

  return (
    <CustomerFormContainer>
      <h1>Create Customer</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="Name" />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <Input {...register("phone")} placeholder="Phone" />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

        <Input {...register("address")} placeholder="Address" />
        {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Customer"}
        </SubmitButton>
      </Form>
    </CustomerFormContainer>
  );
};

export default CreateCustomer;
