// src/pages/Users/CreateUser.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DetailRow } from "@/styles/UserStyles";
import { Input, Select } from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import type { User } from "../types/User";

// Props passed from UserModal
interface CreateUserProps {
  onCancel?: () => void;
  onSuccess?: (user: User) => void;
}

// Local form state type
interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee" | "customer";
}

const CreateUser: React.FC<CreateUserProps> = ({ onCancel, onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUserForm>({
    name: "",
    email: "",
    password: "",
    role: "employee", // default role
  });

  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/users", formData);

      toast.success("User created successfully!");
      if (onSuccess) {
        onSuccess(response.data);
      } else {
        navigate("/users");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <h2 style={{ marginBottom: "24px" }}>Create New User</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <DetailRow>
          <strong>Name:</strong>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </DetailRow>

        <DetailRow>
          <strong>Email:</strong>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </DetailRow>

        <DetailRow>
          <strong>Password:</strong>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </DetailRow>

        <DetailRow>
          <strong>Role:</strong>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </Select>
        </DetailRow>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <Button
            type="button"
            style={{ backgroundColor: "#ccc", color: "#333" }}
            onClick={onCancel ? onCancel : () => navigate("/users")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
