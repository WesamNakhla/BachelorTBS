import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  getCustomerById,
  updateCustomer,
  Customer,
} from "../../api/customerAPI";

// Define form data interface
interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().min(8).required("Phone is required"),
  address: yup.string().required("Address is required"),
});

const EditCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<Customer | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        if (!id) return;
        const data: Customer = await getCustomerById(id);
        setCustomerData(data);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("address", data.address);
      } catch (error) {
        console.error("Failed to load customer:", error);
        toast.error("Failed to load customer.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, setValue]);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (!id) return;
      await updateCustomer(id, data);
      toast.success("Customer updated!");
      navigate("/customers");
    } catch (error) {
      console.error("Failed to update customer:", error);
      toast.error("Failed to update customer.");
    }
  };

  return (
    <CustomerFormContainer>
      <h1>
        Edit Customer
        {customerData?.name && (
          <span style={{ fontWeight: "normal", fontSize: "0.9em", marginLeft: "10px", color: "#6b7280" }}>
            ({customerData.name})
          </span>
        )}
      </h1>

      {loading ? (
        <p>Loading customer...</p>
      ) : (
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
            {isSubmitting ? "Updating..." : "Update Customer"}
          </SubmitButton>
        </Form>
      )}
    </CustomerFormContainer>
  );
};

export default EditCustomer;
