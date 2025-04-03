import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserContainer,
  DetailRow,
} from "../../styles/UserStyles";
import { Input, Select } from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";

// Define the user type
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee" | "client" | "visitor";
}

// Simulated current user's role (should be dynamic from auth context in real app)
const CURRENT_USER_ROLE: User["role"] = "admin"; // Change this for testing

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    try {
      await axios.put(`/api/users/${formData.id}`, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      console.error("Failed to update user:", err);
      toast.error("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <UserContainer>
        <p style={{ textAlign: "center" }}>Loading user data...</p>
      </UserContainer>
    );
  }

  // Error or no user
  if (error || !formData) {
    return (
      <UserContainer>
        <p style={{ color: "red", textAlign: "center" }}>{error || "User not found."}</p>
      </UserContainer>
    );
  }

  return (
    <UserContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit User</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}
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
          <strong>Role:</strong>
          {CURRENT_USER_ROLE === "admin" ? (
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="client">Client</option>
              <option value="visitor">Visitor</option>
            </Select>
          ) : (
            <Input type="text" value={formData.role} readOnly />
          )}
        </DetailRow>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
          <Button
            style={{ backgroundColor: "#ccc", color: "#333" }}
            onClick={() => navigate("/users")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </UserContainer>
  );
};

export default EditUser;
