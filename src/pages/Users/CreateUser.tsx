import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserContainer,
  DetailRow,
} from "../../styles/UserStyles";
import { Input, Select } from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";

// Define the CreateUser form fields
interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUserForm>({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/users", formData);
      toast.success("User created successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create New User</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}>
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
          <Select name="role" value={formData.role} onChange={handleChange} required>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="client">Client</option>
            <option value="viewer">Visitor</option>
          </Select>
        </DetailRow>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button style={{ backgroundColor: "#ccc", color: "#333" }} onClick={() => navigate("/users")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </UserContainer>
  );
};

export default CreateUser;
