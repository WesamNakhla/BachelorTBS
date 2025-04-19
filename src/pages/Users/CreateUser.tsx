// src/pages/Users/CreateUser.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DetailRow } from "@/styles/UserStyles";
import { Input, Select } from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import type { User } from "../types/User";
import { useAuth } from "@/context/AuthContext";

interface CreateUserProps {
  onCancel?: () => void;
  onSuccess?: (user: User) => void;
}

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee" | "customer";
  bankAccount?: string;
}

const generateStrongPassword = () => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const all = upper + lower + digits;
  let pass = upper[0] + lower[0] + digits[0];
  for (let i = 3; i < 10; i++) {
    pass += all[Math.floor(Math.random() * all.length)];
  }
  return pass.split("").sort(() => 0.5 - Math.random()).join("");
};

const CreateUser: React.FC<CreateUserProps> = ({ onCancel, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUserForm>({
    name: "",
    email: "",
    password: "",
    role: user?.role === "admin" ? "employee" : "customer",
    bankAccount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePassword = () => {
    const generated = generateStrongPassword();
    setFormData(prev => ({ ...prev, password: generated }));
    toast.info(`Generated password: ${generated}`);
  };

  const validateBankAccount = (iban: string) => {
    return /^NO\d{13}$/.test(iban.replace(/\s+/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      toast.error("Password must include uppercase, lowercase, and numbers (min 8 chars).");
      setLoading(false);
      return;
    }

    if (user?.role === "employee" && formData.role !== "customer") {
      toast.error("Employees can only create customer accounts.");
      setLoading(false);
      return;
    }

    if (formData.role === "customer" && formData.bankAccount) {
      if (!validateBankAccount(formData.bankAccount)) {
        toast.error("Bank account must start with 'NO' and be 15 characters long.");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post("/api/users", formData);
    
      toast.success("User created successfully!");
      if (onSuccess) {
        onSuccess(response.data);
      } else {
        navigate("/users");
      }
    } catch (err) {
      console.error("User creation failed:", err);
      toast.error("Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <h2 style={{ marginBottom: "24px" }}>Create New User</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* 🟣 Role (always first) */}
        <DetailRow>
          <strong>Role:</strong>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={user?.role === "employee"}
            required
          >
            {user?.role === "admin" && (
              <>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </>
            )}
            <option value="customer">Customer</option>
          </Select>
        </DetailRow>

        {/* Name */}
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

        {/* Email */}
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

        {/* Password + Generate */}
        <DetailRow style={{ alignItems: "flex-start", flexDirection: "column" }}>
          <strong>Password:</strong>
          <div style={{ display: "flex", width: "100%", gap: "12px" }}>
            <Input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ flex: 1 }}
            />
            <Button type="button" $variant="secondary" onClick={handleGeneratePassword}>
              Generate
            </Button>
          </div>
        </DetailRow>

        {/* Bank Account – only for customer */}
        {formData.role === "customer" && (
          <DetailRow>
            <strong>Bank Account:</strong>
            <Input
              type="text"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
              placeholder="e.g., NO1234567890123"
            />
          </DetailRow>
        )}

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
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
